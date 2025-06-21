import * as yup from 'yup';
import onChange from 'on-change';
import render from './watchers.js';
import { i18n } from './i18n.js';

const initialState = {
  form: {
    status: 'idle',
    error: '',
  },
  feeds: [],
};

export default () => {
  console.log('[app] init');
  const watchedState = onChange(initialState, (path) => {
    console.log('[onChange triggered]:', path);
    render(watchedState);
  });

  const form = document.querySelector('#rss-form');
  const input = document.querySelector('#url-input');
  const title = document.querySelector('#main-title');
  const description = document.querySelector('#main-description');
  const button = document.querySelector('#submit-button');

  // Установка переведнных текстов
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
      .then((validUrl) => {
        watchedState.form = {
          status: 'valid',
          error: '',
        };
        watchedState.feeds.push({ url: validUrl });
        form.reset();
        input.focus();
      })
      .catch((err) => {
        watchedState.form = {
          status: 'invalid',
          error: err.message,
        };
      });
  });
};