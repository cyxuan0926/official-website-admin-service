'use strict';

const jwt = require('jsonwebtoken');
// TODO 异常处理中间件
module.exports = (options, app) => {
  return async function(ctx, next) {
    const result = ctx.request.get('Authorization').match(/^Bearer (.+)$/i);
    const token = result ? result[1] : null;
    let tokenData = null;

    if (token) {
      try {
        tokenData = jwt.verify(token, app.config.jwt.secret);
        ctx.locals.user = tokenData.user;
      } catch (err) {
        if ([ 'TokenExpiredError', 'NotBeforeError' ].includes(err.name)) {
          ctx.responseHandler[401](ctx.errorsMap.TOKEN_EXPIRED);
        }

        if (err.name === 'JsonWebTokenError') {
          ctx.responseHandler[401](ctx.errorsMap.TOKEN_INVALID);
        }
      }

      tokenData && await next();
    } else {
      ctx.responseHandler[401](ctx.errorsMap.UN_LOGIN);
    }

  };
};
