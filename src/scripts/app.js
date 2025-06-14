import * as yup from 'yup';
import onChange from 'on-change';
import render from './watchers.js';

const initialState = {  //начальное состояние 
  form: {
    status: 'idle',
    error: '',
  },
  feeds: [], //масссив добавленных рсс ссылок
};

export default () => {
  console.log('[app] init');
  const watchedState = onChange(initialState, (path) => { //создали обёртку над состочнием.При изменении watchedState вызываем render()
    console.log('[onChange triggered]:', path);
    render(watchedState);
  });

  //Поулчаем dom-элементы по id
  const form = document.querySelector('#rss-form');
  const input = document.querySelector('#url-input');

  // Схема валидации
  const makeSchema = (urls) => yup
    .string()
    .required('Поле не должно быть пустым')
    .url('Ссылка должна быть валидным URL')
    // .matches(/^https:\/\//, 'Ссылка должна начинаться с https://')
    .notOneOf(urls, 'RSS уже существует');

  form.addEventListener('submit', (e) => {
    console.log('[submit event]');
    e.preventDefault(); //чтоб не перезагружалась страница
    const url = input.value.trim();
    const urls = watchedState.feeds.map((f) => f.url); //создаём список уже добавл урлов
    const schema = makeSchema(urls); //схема на основе списка

    schema.validate(url) // возвращаем промис
    .then((validUrl) => { //проверенная строка
      console.log('[validation] success'); //если ок
      watchedState.form = { //обновляем состояние
        status: 'valid', //говорим ui что всё хорошо
        error: '', //очищаем предыдущую ошибку
        //изменение вызовет onChanged ---> render()
      };
      watchedState.feeds.push({ url: validUrl }); //добавляем урл в список
      form.reset(); //чистим поле
      input.focus(); // курсор на поле если нужно несколько
    })
    .catch((err) => { //если не ок
      console.log('[validation] error', err.message);
      watchedState.form = {
        status: 'invalid',
        error: err.message,
     };
    });
  });
};
