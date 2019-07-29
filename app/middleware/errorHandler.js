'use strict';

module.exports = () => {
  return async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.app.emit('error', err);
      ctx.body = '服务器内部错误';
      ctx.status = err.status || 500;
    }
  };
};
