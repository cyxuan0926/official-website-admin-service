'use strict';

const Service = require('egg').Service;

class ArticlesService extends Service {
  async create(article) {
    const result = await this.app.mysql.insert('tb_articles', article);
    console.log('create article result', result);
    return { article_id: result.insertId };
  }
}

module.exports = ArticlesService;
