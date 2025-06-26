import { i18n } from './i18n.js';


export const handleValidationState = (formState) => {
  const input = document.querySelector('#url-input');
  const feedback = document.querySelector('#feedback');

  if (!input || !feedback) return;

  if (formState.status === 'valid') {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    feedback.textContent = i18n.t('feedback.success');
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
  }

  if (formState.status === 'invalid') {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    feedback.textContent = formState.error;
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
  }

  if (formState.status === 'idle') {
    input.classList.remove('is-valid', 'is-invalid');
    feedback.textContent = '';
    feedback.classList.remove('text-success', 'text-danger');
  }
};



export const renderFeedsAndPosts = (feeds, posts) => {
  const feedsContainer = document.querySelector('#feeds');
  const postsContainer = document.querySelector('#posts');

  // чистим
  feedsContainer.innerHTML = '';
  postsContainer.innerHTML = '';

  // Рендерим фиды
  const feedsBlock = document.createElement('div');
  feedsBlock.innerHTML = '<h2>Фиды</h2>';
  const feedsList = document.createElement('ul');
  feedsList.classList.add('list-group', 'mb-4');

  feeds.forEach(({ title, description }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    feedsList.append(li);
  });

  feedsBlock.append(feedsList);
  feedsContainer.append(feedsBlock);

  // Рендерим посты
  const postsBlock = document.createElement('div');
  postsBlock.innerHTML = '<h2>Посты</h2>';
  const postsList = document.createElement('ul');
  postsList.classList.add('list-group');

  posts.forEach(({ title, link }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
    const a = document.createElement('a');
    a.setAttribute('href', link);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.textContent = title;
    li.append(a);
    postsList.append(li);
  });

  postsBlock.append(postsList);
  postsContainer.append(postsBlock);
};

