'use strict';

module.exports = {
  get errorsMap() {
    /**
     * 错误码
     * 400××× 客户端错误
     * 401××× 身份认证错误
     */
    return {
      ACCOUNT_UNMATCH: { error_code: 400001, message: '用户名或密码错误' },
      OLD_PASSWORD_UNMATCH: {
        error_code: 400002,
        message: '原密码输入错误',
      },
      PASSWORD_NOT_EQUAL: {
        error_code: 400003,
        message: '两次输入密码不一致',
      },
      UN_LOGIN: { error_code: 401001, message: '未登录' },
      TOKEN_EXPIRED: { error_code: 401002, message: 'token已过期' },
      TOKEN_INVALID: { error_code: 401003, message: 'token无效' },
    };
  },

  get responseHandler() {
    const self = this;

    return {
      200(data) {
        self.status = 200;
        self.body = data;
      },
      201(data) {
        self.status = 201;
        self.body = data;
      },
      204() {
        self.status = 204;
      },
      400({ error_code, message }) {
        self.status = 400;
        self.body = { error_code, message };
      },
      401({ error_code, message }) {
        self.status = 401;
        self.body = { error_code, message };
      },
    };
  },
};
