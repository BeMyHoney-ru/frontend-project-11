export default (state) => { //принимаем state, который отслеживается чз onChanged
  console.log('[watcher] render status:', state.form.status);
  //получаем элементы из DOM
  const input = document.querySelector('#url-input');
  const feedback = document.querySelector('#feedback'); //конт под сообщениие пользователю

// успех
  if (state.form.status === 'valid') {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    feedback.textContent = 'Поток успешно добавлен!';
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
  }
// проблема
  if (state.form.status === 'invalid') {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    feedback.textContent = state.form.error;
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
  }
// исходное состояние
  if (state.form.status === 'idle') {
    input.classList.remove('is-valid', 'is-invalid');
    feedback.textContent = '';
    feedback.classList.remove('text-success', 'text-danger');
  }
};