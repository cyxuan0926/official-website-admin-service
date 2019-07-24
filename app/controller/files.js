'use strict';

const Controller = require('../core/base-controller');

class FilesController extends Controller {
  async uploadFile() {
    const { ctx, service } = this;
    const result = await service.files.create();
    ctx.responseHandler[201](result);
  }

  async deleteFile() {
    const { ctx, service } = this;
    console.log('delete file', ctx.request.body);
    await service.files.remove(ctx.request.body);
    ctx.responseHandler[204]();
  }
}

module.exports = FilesController;
