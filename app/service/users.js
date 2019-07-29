'use strict';

const Service = require('../core/base-service');

class UsersService extends Service {
  async find({ username, password }) {
    const result = await this.app.mysql.select('tb_users', {
      where: { username, password },
      columns: [ 'username' ],
      limit: 1,
    });

    return result.length > 0 ? result[0] : null;
  }

  async update({ username, password }) {
    const result = await this.app.mysql.update('tb_users', { password }, {
      where: { username },
    });

    return result.affectedRows === 1;
  }
}

module.exports = UsersService;
