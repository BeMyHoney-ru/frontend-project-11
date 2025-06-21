import i18next from 'i18next';
import resources from './locales/languages.js';

const i18n = i18next.createInstance();

const defaultLanguage = 'ru';

const initI18n = () => i18n.init({
  lng: defaultLanguage,
  debug: false,
  resources,
});

export default initI18n;
export { i18n };