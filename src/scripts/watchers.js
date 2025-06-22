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