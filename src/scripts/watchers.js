import { i18n } from './i18n';

export const handleValidationState = (formState) => {
  const input = document.querySelector('#url-input');
  const feedback = document.querySelector('#feedback');

  if (!input || !feedback) {
    return;
  }

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
  const feedsContainer = document.querySelector('.feeds');
  const postsContainer = document.querySelector('.posts');

  feedsContainer.innerHTML = `<h2>${i18n.t('rss.feeds')}</h2>`;
  postsContainer.innerHTML = `<h2>${i18n.t('rss.posts')}</h2>`;

  const feedsList = document.createElement('ul');
  feedsList.classList.add('list-group', 'mb-3');

  feeds.forEach((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `<h3>${feed.title}</h3><p>${feed.description}</p>`;
    feedsList.appendChild(li);
  });

  feedsContainer.appendChild(feedsList);

  const postsList = document.createElement('ul');
  postsList.classList.add('list-group');

  posts.slice().reverse().forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');

    const link = document.createElement('a');
    link.setAttribute('href', post.link);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.classList.add('fw-bold');
    link.textContent = post.title;

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-sm', 'btn-primary');
    button.textContent = i18n.t('rss.linkBtn');
    button.setAttribute('type', 'button');
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#modal';

    button.addEventListener('click', () => {
      const modalTitle = document.querySelector('.modal-title');
      const modalBody = document.querySelector('.modal-body');
      const fullArticle = document.querySelector('.full-article');

      modalTitle.textContent = post.title;
      modalBody.textContent = post.description;
      fullArticle.setAttribute('href', post.link);

      link.classList.remove('fw-bold');
      link.classList.add('fw-normal', 'text-muted');
    });

    li.append(link, button);
    postsList.appendChild(li);
  });

  postsContainer.appendChild(postsList);

  // Устранение ARIA предупреждения при закрытии модалки - не рабоает
  const modalElement = document.getElementById('modal');
  if (modalElement) {
    modalElement.addEventListener('hidden.bs.modal', () => {
      setTimeout(() => {
        const input = document.querySelector('#url-input');
        if (input) {
          input.focus();
        }
      }, 0);
    });
  }
};
