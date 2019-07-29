'use strict';

const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { Base64 } = require('js-base64');
const Controller = require('../core/base-controller');
const { accountRule } = require('../common/validation/rules');

class UsersController extends Controller {
  async createToken() {
    const { app, ctx, service } = this;
    const account = ctx.request.body;
    ctx.validate(accountRule, account);

    account.password = md5(Base64.decode(account.password));
    const accountInfo = await service.users.find(account);

    if (accountInfo) {
      const token = jwt.sign(
        { user: { username: accountInfo.username } },
        app.config.jwt.secret,
        { expiresIn: '2h' }
      );

      ctx.responseHandler[201]({ token });
    } else {
      ctx.responseHandler[400](ctx.errorsMap.ACCOUNT_UNMATCH);
    }
  }

  async update() {
    const { ctx, service } = this;
    const username = ctx.params.username;
    const { old_password, new_password, confirm_password } = ctx.request.body;
    // ctx.validate(accountRule, account);

    // TODO: 表单校验
    if (new_password !== confirm_password) {
      ctx.responseHandler[400](ctx.errorsMap.PASSWORD_NOT_EQUAL);
      return;
    }

    const account = await service.users.find({
      username,
      password: md5(Base64.decode(old_password)),
    });

    if (account) {
      await service.users.update({
        username,
        password: md5(Base64.decode(new_password)),
      });

      ctx.responseHandler[201]();
    } else {
      ctx.responseHandler[400](ctx.errorsMap.OLD_PASSWORD_UNMATCH);
    }
  }
}

module.exports = UsersController;
