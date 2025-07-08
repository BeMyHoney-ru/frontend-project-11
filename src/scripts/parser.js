export default (rssText) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rssText, 'application/xml');
  const parseError = doc.querySelector('parsererror');

  if (parseError) {
    throw new Error('noValidRss');
  }

  const feedTitle = doc.querySelector('channel > title')?.textContent ?? '';
  const feedDescription = doc.querySelector('channel > description')?.textContent ?? '';

  const items = doc.querySelectorAll('item');
  const posts = Array.from(items).map((item) => ({
    title: item.querySelector('title')?.textContent ?? '',
    description: item.querySelector('description')?.textContent ?? '',
    link: item.querySelector('link')?.textContent ?? '',
  }));

  return {
    feed: {
      title: feedTitle,
      description: feedDescription,
    },
    posts,
  };
};
