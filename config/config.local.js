/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = {
  cluster: {
    listen: {
      port: 8002,
    },
  },
  mysql: {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root_123456',
      database: 'db_official_website',
    },
  },
};
