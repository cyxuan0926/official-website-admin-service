'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const api = router.namespace('/api/v1');

  router.get('/', controller.home.index);

  api.post('/oauth/token', controller.users.create);

  api.post('/files', controller.files.uploadFile);
  api.delete('/files', controller.files.deleteFile);

  api.post('/articles', controller.articles.create);
};
