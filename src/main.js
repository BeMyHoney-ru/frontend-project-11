import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import app from './scripts/app';
import initI18n, { i18n } from './scripts/i18n';
import makeModalDraggable from './scripts/dragModal';

initI18n().then(() => {
  app();
  makeModalDraggable();

  const switcher = document.querySelector('#language-switcher');
  switcher.addEventListener('change', (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang).then(() => {
      app();
    });
  });
});
