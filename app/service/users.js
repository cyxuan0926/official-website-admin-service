'use strict';

const Service = require('egg').Service;

class UsersService extends Service {
  async find({ username, password }) {
    const result = await this.app.mysql.select('tb_Users', {
      where: { username, password },
      columns: [ 'username' ],
      limit: 1,
    });

    return result.length > 0 ? result[0] : null;
  }
}

module.exports = UsersService;
