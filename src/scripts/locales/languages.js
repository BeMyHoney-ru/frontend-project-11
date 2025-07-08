const resources = {
  ru: {
    translation: {
      header: 'RSS агрегатор',
      description: 'RSS - самый быстрый способ отслеживать темы и новости, которые вас интересуют',
      button: 'Добавить',
      label: 'Вставьте сюда RSS-ссылку',
      feedback: {
        success: 'RSS успешно загружен',
        emptyField: 'Не должно быть пустым',
        invalidUrl: 'Ссылка должна быть валидным URL',
        noValidRss: 'Ресурс не содержит валидный RSS',
        rssAlreadyAdded: 'RSS уже существует',
        connectionError: 'Ошибка сети',
      },
      rss: {
        feeds: 'Фиды',
        posts: 'Посты',
        linkBtn: 'Просмотр',
      },
      modal: {
        openEntire: 'Читать полностью',
        close: 'Закрыть',
      },
    },
  },
  en: {
    translation: {
      header: 'RSS aggregator',
      description: 'RSS is the fastest way to follow topics and news you care about',
      button: 'Add',
      label: 'Paste RSS link here',
      feedback: {
        success: 'RSS loaded successfully',
        emptyField: 'Field must not be empty',
        invalidUrl: 'The link must be a valid URL',
        noValidRss: 'The resource does not contain valid RSS',
        rssAlreadyAdded: 'RSS already exists',
        connectionError: 'Network error',
      },
      rss: {
        feeds: 'Feeds',
        posts: 'Posts',
        linkBtn: 'View',
      },
      modal: {
        openEntire: 'Read fully',
        close: 'Close',
      },
    },
  },
};

export default resources;
