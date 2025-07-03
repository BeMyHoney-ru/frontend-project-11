
import { i18n } from './i18n.js';
import { Modal } from 'bootstrap';

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

export const renderFeedsAndPosts = (feeds, posts, state) => {
  const feedsContainer = document.querySelector('.feeds');
  const postsContainer = document.querySelector('.posts');

  feedsContainer.innerHTML = '<h2>Фиды</h2>';
  const feedsList = document.createElement('ul');
  feedsList.classList.add('list-group', 'mb-4');
  feeds.forEach((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `<h3>${feed.title}</h3><p>${feed.description}</p>`;
    feedsList.appendChild(li);
  });
  feedsContainer.appendChild(feedsList);

  postsContainer.innerHTML = '<h2>Посты</h2>';
  const postsList = document.createElement('ul');
  postsList.classList.add('list-group');

  posts.forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');

    const link = document.createElement('a');
    link.href = post.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = post.title;

    // меняем стиль прочитанные/непрочитанные
    if (state.readPosts.includes(post.id)) {
      link.classList.remove('fw-bold');
      link.classList.add('fw-normal', 'text-secondary'); // делаем серым прочитанное
    } else {
      link.classList.remove('fw-normal', 'text-secondary');
      link.classList.add('fw-bold');
    }

    const previewButton = document.createElement('button');
    previewButton.classList.add('btn', 'btn-sm', 'btn-primary', 'ms-2');
    previewButton.textContent = 'Просмотр';

    previewButton.addEventListener('click', () => {
      // + в прочитанные
      if (!state.readPosts.includes(post.id)) {
        state.readPosts.push(post.id);
      }

      // модальное окно
      const modalTitle = document.getElementById('modalTitle');
      const modalBody = document.getElementById('modalBody');
      const modalFullArticle = document.getElementById('modalFullArticle');

      modalTitle.textContent = post.title;
      modalBody.textContent = post.description;
      modalFullArticle.href = post.link;

      // открываеи модальное окно
      const modalElement = document.getElementById('previewModal');
      const bsModal = new Modal(modalElement);
      bsModal.show();
    });

    li.appendChild(link);
    li.appendChild(previewButton);
    postsList.appendChild(li);
  });

  postsContainer.appendChild(postsList);
};
