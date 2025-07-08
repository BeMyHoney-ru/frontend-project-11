import * as yup from 'yup';
import onChange from 'on-change';
import { i18n } from './i18n';
import { handleValidationState, renderFeedsAndPosts } from './watchers';
import getRssContent from './loadRss';
import parseRss from './parser';

const initialState = {
  form: {
    status: 'idle',
    error: '',
  },
  feeds: [],
  posts: [],
};

export default () => {
  let feedId = 1;
  let postId = 1;

  const watchedState = onChange(initialState, (path) => {
    console.log('[onChange triggered]:', path);

    if (path.startsWith('form')) {
      handleValidationState(watchedState.form);
    }

    if (path === 'feeds' || path === 'posts') {
      renderFeedsAndPosts(watchedState.feeds, watchedState.posts);
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
            id: feedId,
            url: validUrl,
            title: feed.title,
            description: feed.description,
          };
          feedId += 1;
          watchedState.feeds.push(newFeed);

          const newPosts = posts.map((post) => ({
            ...post,
            feedId: newFeed.id,
            id: postId,
          }));
          postId += posts.length;
          watchedState.posts.push(...newPosts);

          watchedState.form = {
            status: 'valid',
            error: '',
          };

          form.reset();
          input.focus();
        }))
      .catch((err) => {
        console.log('[error]', err.message);

        const isValidationError = err.name === 'ValidationError';
        watchedState.form = {
          status: 'invalid',
          error: isValidationError ? err.message : i18n.t('feedback.connectionError'),
        };
      });
  });
};
