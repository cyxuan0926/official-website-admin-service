'use strict';

const Controller = require('../core/base-controller');
const { articleRule } = require('../common/validation/rules');

class ArticlesController extends Controller {
  async index() {
    const { ctx, service } = this;
    // ctx.query.page_num = ctx.query.page_num ? parseInt(ctx.query.page_num) : und
    const query = Object.assign({}, ctx.query, {
      page_num: parseInt(ctx.query.page_num),
      page_size: parseInt(ctx.query.page_size),
    });
    const articles = await service.articles.findBy(query);
    // const { page_num, page_size } = ctx.query;
    // const articles = await service.articles.findAll({
    //   page_num: parseInt(page_num),
    //   page_size: parseInt(page_size),
    // });
    ctx.responseHandler[200](articles);
  }

  async find() {
    const { ctx, service } = this;
    const article = await service.articles.find(ctx.params.article_id);
    ctx.responseHandler[200](article);
  }

  async create() {
    const { ctx, service } = this;
    const article = ctx.request.body;
    article.create_time = article.update_time = ctx.helper.formatTime();
    article.article_publish_time = ctx.helper.formatTime(
      article.article_publish_time
    );

    ctx.validate(articleRule, article);
    const articleInfo = await service.articles.save(article);
    ctx.responseHandler[201](articleInfo);
  }

  async update() {
    const { ctx, service } = this;
    const articleParams = Object.assign(ctx.request.body, {
      update_time: ctx.helper.formatTime(),
    });

    if (articleParams.article_publish_time) {
      articleParams.article_publish_time = ctx.helper.formatTime(articleParams.article_publish_time);
    }

    await service.articles.update(ctx.params.article_id, articleParams);
    ctx.responseHandler[204]();
  }

  async updateBatch() {
    const { ctx, service } = this;

    ctx.request.body.forEach(async article => {
      const article_id = article.article_id;
      delete article.article_id;
      await service.articles.update(article_id, article);
    });

    ctx.responseHandler[204]();
  }
}

module.exports = ArticlesController;
