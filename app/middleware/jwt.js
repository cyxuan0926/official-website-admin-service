'use strict';

const jwt = require('jsonwebtoken');

module.exports = (options, app) => {
  return async function(ctx, next) {
    // await next();
    const result = ctx.request.get('Authorization').match(/^Bearer (.+)$/i);
    const token = result ? result[1] : null;

    if (token) {
      try {
        const tokenData = jwt.verify(token, app.config.jwt.secret);
        console.log('tokenData', tokenData);
        ctx.locals.user = tokenData.user;
        await next();
      } catch (err) {
        console.log('jwt', err.name, err.message);
        if ([ 'TokenExpiredError', 'NotBeforeError' ].includes(err.name)) {
          ctx.responseHandler[401](ctx.errorsMap.TOKEN_EXPIRED);
        }

        if (err.name === 'JsonWebTokenError') {
          ctx.responseHandler[401](ctx.errorsMap.TOKEN_INVALID);
        }
      }
    } else {
      ctx.responseHandler[401](ctx.errorsMap.UN_LOGIN);
    }

  };
};
