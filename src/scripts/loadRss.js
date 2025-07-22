import axios from 'axios';

const getRssContent = (url) => {
  const encodedUrl = encodeURIComponent(url);
  const allOriginsUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodedUrl}`;

  return axios
    .get(allOriginsUrl)
    .then((response) => response.data.contents)
    .catch((error) => {
      // выбрасываем если это СЕТЕВАЯ!!! ошибка
      if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        throw new Error('networkError');
      }
      // остальные дальше, чтоб проверить валидность RSS
      throw error;
    });
};

export default getRssContent;