'use strict';

// const Controller = require('egg').Controller;
const Controller = require('../core/base-controller');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
