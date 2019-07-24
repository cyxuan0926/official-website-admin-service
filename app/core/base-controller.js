'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  get user() {
    return this.ctx.locals.user;
  }
}

module.exports = BaseController;
