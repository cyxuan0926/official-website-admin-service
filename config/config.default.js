/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1562912002800_1993';

  // add your middleware config here
  config.middleware = [ 'jwt' ];

  config.jwt = {
    secret: '_guo_ke_',
    ignore: /\/oauth\/token$/,
  };

  config.multipart = {
    mode: 'file',
  };

  config.upload = {
    uploadDir: path.resolve(process.cwd(), '../official-website-upload'),
  };

  config.static = {
    dir: [
      path.resolve(process.cwd(), 'app/public'),
      path.resolve(process.cwd(), '../official-website-assets'),
      path.resolve(process.cwd(), '../official-website-upload'),
    ],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
