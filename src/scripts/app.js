import * as yup from 'yup';
import onChange from 'on-change';
import { i18n } from './i18n.js';
import { handleValidationState, renderFeedsAndPosts } from './watchers.js';
import getRssContent from './loadRss.js';
import parseRss from './parser.js';

const initialState = {
  form: {
    status: 'idle',
    error: '',
  },
  feeds: [],
  posts: [],
  readPosts: [],
};

let feedId = 1;
let postId = 1;

export default () => {
  const watchedState = onChange(initialState, (path) => {
    console.log('[onChange triggered]:', path);
    if (path.startsWith('form')) {
      handleValidationState(watchedState.form);
    }
    // обновляем с учётом прочитанности
    if (path === 'feeds' || path === 'posts' || path === 'readPosts') {
      renderFeedsAndPosts(watchedState.feeds, watchedState.posts, watchedState);
    }
  });

  const form = document.querySelector('#rss-form');
  const input = document.querySelector('#url-input');
  const title = document.querySelector('#main-title');
  const description = document.querySelector('#main-description');
  const button = document.querySelector('#submit-button');

  title.textContent = i18n.t('header');
  description.textContent = i18n.t('description');
  input.placeholder = i18n.t('label');
  button.textContent = i18n.t('button');

  const makeSchema = (urls) => yup
    .string()
    .required(i18n.t('feedback.emptyField'))
    .url(i18n.t('feedback.invalidUrl'))
    .notOneOf(urls, i18n.t('feedback.rssAlreadyAdded'));

  // оновляем фиды
  const updateFeeds = () => {
    const promises = watchedState.feeds
      .filter((feed) => Boolean(feed.url)) // защищаем от пустых урлов
      .map((feed) =>
        getRssContent(feed.url)
          .then((rssText) => {
            const { posts } = parseRss(rssText);
            const existingLinks = watchedState.posts.map((post) => post.link);
            const newPosts = posts
              .filter((post) => !existingLinks.includes(post.link))
              .map((post) => ({
                ...post,
                feedId: feed.id,
                id: postId++,
              }));
            if (newPosts.length > 0) {
              watchedState.posts.unshift(...newPosts);
            }
          })
          .catch((err) => {
            console.log(`[updateFeeds error]: ${err.message}`);
          })
      );

    Promise.all(promises)
      .finally(() => {
        setTimeout(updateFeeds, 5000); // повтор через 5 сек
      });
  };

  // обработка формы
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = input.value.trim();
    const urls = watchedState.feeds.map((f) => f.url);
    const schema = makeSchema(urls);

    schema.validate(url)
      .then((validUrl) => getRssContent(validUrl)
        .then((rssText) => {
          const { feed, posts } = parseRss(rssText);

          const newFeed = {
            id: feedId++,
            url: validUrl,
            title: feed.title,
            description: feed.description,
          };
          watchedState.feeds.push(newFeed);

          const newPosts = posts.map((post) => ({
            ...post,
            feedId: newFeed.id,
            id: postId++,
          }));
          watchedState.posts.push(...newPosts);

          watchedState.form = {
            status: 'valid',
            error: '',
          };
          form.reset();
          input.focus();

          // после первого фида обновляем
          if (watchedState.feeds.length === 1) {
            updateFeeds();
          }
        }))
      .catch((err) => {
        console.log('[error]', err.message);
        let errorMessage;

        if (err.message === 'noValidRss') {
          errorMessage = i18n.t('feedback.noValidRss');
        } else if (err.message === i18n.t('feedback.rssAlreadyAdded')) {
          errorMessage = i18n.t('feedback.rssAlreadyAdded');
        } else if (err.message === i18n.t('feedback.invalidUrl')) {
          errorMessage = i18n.t('feedback.invalidUrl');
        } else {
          errorMessage = i18n.t('feedback.connectionError');
        }

        watchedState.form = {
          status: 'invalid',
          error: errorMessage,
        };
      });
  });
};