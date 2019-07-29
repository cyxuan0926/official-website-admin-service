'use strict';

// const Service = require('egg').Service;
const Service = require('../core/base-service');

class ArticlesService extends Service {
  async find(article_id) {
    const result = await this.app.mysql.select('tb_articles', {
      where: { article_id },
      columns: [ 'article_id', 'article_type_id', 'article_title', 'article_subtitle', 'article_author', 'article_source', 'article_description', 'article_content', 'article_status', 'article_istop', 'article_rank', 'article_cover', 'article_publish_time' ],
      limit: 1,
    });

    if (result.length > 0) {
      result[0].article_publish_time = new Date(result[0].article_publish_time).getTime();
      return result[0];
    }
  }

  async findBy(filter) {
    const { ctx, app } = this;
    const {
      article_title,
      article_type_id,
      article_status,
      start_time,
      end_time,
      page_num,
      page_size,
    } = filter;

    const filterSql = this.createSingleTableFilterSql({
      table: 'tb_articles',
      where: [
        {
          key: 'article_title',
          value: article_title,
          operator: 'LIKE',
        },
        {
          key: 'article_type_id',
          value: article_type_id,
          operator: '=',
        },
        {
          key: 'article_status',
          value: article_status,
          operator: '=',
        },
        {
          key: 'article_publish_time',
          value: start_time && `'${ctx.helper.formatTime(parseInt(start_time))}'`,
          operator: '>=',
        },
        {
          key: 'article_publish_time',
          value: end_time && `'${ctx.helper.formatTime(parseInt(end_time))}'`,
          operator: '<=',
        },
      ],
    });

    const querySql = `
      SELECT article_id, article_type_name, article_title, article_subtitle, article_author, article_source, article_status, article_istop, article_rank, article_cover, article_publish_time
      FROM tb_articles, tb_article_types
      WHERE tb_articles.article_type_id = tb_article_types.article_type_id
      ${filterSql && 'AND ' + filterSql}
      ORDER BY article_istop DESC, article_rank, field(article_status, 2, 3, 1, 4), article_publish_time DESC
      LIMIT ? OFFSET ?;
    `;

    const total_rows = await this.getRows('tb_articles', filterSql);
    const articles = await app.mysql.query(
      querySql,
      [ page_size, page_size * (page_num - 1) ]
    );

    articles.forEach(article => {
      article.article_publish_time = new Date(article.article_publish_time).getTime();
    });

    return {
      data: articles,
      meta: {
        pagination: {
          has_previous: page_num > 1,
          has_next: page_num * page_size < total_rows,
          page_size,
          page_num,
          total_rows,
          total_pages: Math.ceil(total_rows / page_size),
        },
      },
    };
  }

  async save(article) {
    const result = await this.app.mysql.insert('tb_articles', article);

    return { article_id: result.insertId };
  }

  async update(article_id, articleParams) {
    const result = await this.app.mysql.update('tb_articles', articleParams, {
      where: { article_id },
    });

    return result.affectedRows === 1;
  }
}

module.exports = ArticlesService;
