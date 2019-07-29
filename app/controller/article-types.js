'use strict';

const Controller = require('../core/base-controller');

class ArticleTypesController extends Controller {
  async index() {
    const { ctx, service } = this;
    const articleTypes = await service.articleTypes.findAll();

    ctx.responseHandler[200](articleTypes);
  }
}

module.exports = ArticleTypesController;
