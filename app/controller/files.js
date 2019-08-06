'use strict';

const Controller = require('../core/base-controller');

class FilesController extends Controller {
  async create() {
    const { ctx, service } = this;
    const result = await service.files.save();
    ctx.responseHandler[201](result);
  }

  async remove() {
    const { ctx, service } = this;
    await service.files.remove(ctx.request.body);
    // await service.files.remove(ctx.params.file_path);
    ctx.responseHandler[204]();
  }
}

module.exports = FilesController;
