import 'bootstrap/dist/css/bootstrap.min.css';
import app from './scripts/app.js';
import initI18n from './scripts/i18n.js';
import { i18n } from './scripts/i18n.js';
import makeModalDraggable from './scripts/dragModal.js';

initI18n().then(() => {
  app();
  makeModalDraggable(); //попробуем сделать перетаскиваемым


  const switcher = document.querySelector('#language-switcher');
  switcher.addEventListener('change', (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang).then(() => {
      app(); // перезапускаем интерфейс с новым языком
    });
  });
});

// косяк - если на экране фидбек уже есть при смене языка остаётся на старом языке