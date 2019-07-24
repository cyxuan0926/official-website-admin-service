'use strict';

const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { Base64 } = require('js-base64');
const Controller = require('../core/base-controller');
const { accountRule } = require('../common/validation/rules');

class UsersController extends Controller {
  async create() {
    const { app, ctx, service } = this;
    const account = ctx.request.body;
    ctx.validate(accountRule, account);
    console.log('login', account);

    account.password = md5(Base64.decode(account.password));
    const accountInfo = await service.users.find(account);
    console.log('accountInfo', accountInfo);

    if (accountInfo) {
      const token = jwt.sign(
        { user: { username: accountInfo.username } },
        app.config.jwt.secret,
        { expiresIn: '1h' }
      );
      console.log('token', app.config.jwt.secret, token, jwt.verify(token, app.config.jwt.secret));
      ctx.responseHandler[201]({ token });
    } else {
      ctx.responseHandler[400](ctx.errorsMap.ACCOUNT_UNMATCH);
    }
  }
}

module.exports = UsersController;
