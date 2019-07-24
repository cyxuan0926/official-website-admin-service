'use strict';

module.exports = {
  get errorsMap() {
    return {
      ACCOUNT_UNMATCH: { code: 'A001', message: '用户名或密码错误' },
      UN_LOGIN: { code: 'A002', message: '未登录' },
      TOKEN_EXPIRED: { code: 'A003', message: 'token已过期' },
      TOKEN_INVALID: { code: 'A004', message: 'token无效' },
    };
  },

  get responseHandler() {
    const self = this;

    return {
      201(data) {
        self.status = 201;
        self.body = data;
      },
      204() {
        self.status = 204;
      },
      400({ code, message }) {
        self.status = 400;
        self.body = { code, message };
      },
      401({ code, message }) {
        self.status = 401;
        self.body = { code, message };
      },
    };
  },
};
