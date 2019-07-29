'use strict';

// const Service = require('egg').Service;
const Service = require('../core/base-service');

class ArticleTypesService extends Service {
  async findAll() {
    const result = await this.app.mysql.select('tb_article_types', {
      columns: [ 'article_type_id', 'article_type_name' ],
    });

    return result;
  }
}

module.exports = ArticleTypesService;
