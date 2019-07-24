'use strict';

const Controller = require('../core/base-controller');
const { articleRule } = require('../common/validation/rules');

class ArticlesController extends Controller {
  async create() {
    const { ctx, service } = this;
    const article = ctx.request.body;
    article.create_time = article.update_time = ctx.helper.formatTime();
    article.article_publish_time = ctx.helper.formatTime(
      article.article_publish_time
    );
    console.log('create article', article);

    ctx.validate(articleRule, article);
    const articleInfo = await service.articles.create(article);
    ctx.responseHandler[201](articleInfo);
  }

  // async deleteArticle() {
  //   const { ctx, service } = this;
  //   console.log('delete article', ctx.request.body);
  //   const result = await service.article.remove(ctx.request.body);
  //   ctx.body = result;
  // }
}

module.exports = ArticlesController;
