'use strict';

const { Service } = require('egg');

class BaseService extends Service {
  insertSuccess(result) {
    return result.affectedRows === 1;
  }

  async getRows(table, filterSql = '') {
    const sql = `
      SELECT count(*) AS total_rows FROM ${table}
      ${filterSql && 'WHERE ' + filterSql};
    `;
    const result = await this.app.mysql.query(sql);
    return result.length > 0 ? result[0].total_rows : 0;
  }

  createSingleTableFilterSql({ table, where }) {
    let sql = '';

    where.forEach(item => {
      let { key, value, operator } = item;

      operator = operator.toLocaleUpperCase();

      switch (operator) {
        case 'LIKE':
          if (value) {
            sql += ` AND ${table}.${key} ${operator} '%${value}%'`;
          }
          break;

        default:
          if (value) {
            sql += ` AND ${table}.${key} ${operator} ${value}`;
          }
          break;
      }
    });

    return sql.substring(5);
  }
}

module.exports = BaseService;
