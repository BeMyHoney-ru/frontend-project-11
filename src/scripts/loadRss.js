import axios from 'axios';

const getRssContent = (url) => {
  const encodedUrl = encodeURIComponent(url);
  const allOriginsUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodedUrl}`;
  return axios.get(allOriginsUrl)
    .then((response) => response.data.contents)
    .catch(() => {
      throw new Error('networkError');
    });
};

export default getRssContent;