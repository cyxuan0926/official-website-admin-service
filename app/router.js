'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const api = router.namespace('/api/v1');

  api.post('/oauth/token', controller.users.createToken);
  api.put('/users/:username/password', controller.users.update);

  api.get('/article_types', controller.articleTypes.index);

  api.get('/articles', controller.articles.index);
  api.get('/articles/:article_id', controller.articles.find);
  api.post('/articles', controller.articles.create);
  api.put('/articles/:article_id', controller.articles.update);
  api.put('/articles', controller.articles.updateBatch);

  api.post('/files', controller.files.create);
  api.delete('/files/:file_path', controller.files.remove);
  // api.delete('/files', controller.files.remove);

  api.get('/contacts', controller.contacts.index);
  api.post('/contacts', controller.contacts.create);
  api.put('/contacts/:contact_id', controller.contacts.update);
  api.delete('/contacts/:contact_id', controller.contacts.remove);
};
