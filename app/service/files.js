'use strict';

const path = require('path');
const md5 = require('md5');
const fsPromises = require('fs').promises;
const Service = require('egg').Service;

class FileService extends Service {
  async create() {
    const { ctx } = this;
    return this._storeFile(ctx.request.files[0]);
  }

  async remove(fileList) {
    const { config } = this;

    try {
      for (let i = 0; i < fileList.length; i++) {
        await fsPromises.unlink(
          path.resolve(config.upload.uploadDir, fileList[i].filename)
        );
      }
      return { code: 0, msg: '文件删除成功' };
    } catch (err) {
      throw err;
    }
  }

  async _storeFile(file) {
    const { ctx, config } = this;
    const { filename, filepath } = file;
    const result = filename.match(/^(.+?)(\.\w+)?$/);
    // const imageSuffix = [ '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.wbmp', '.webp', '.svg' ];
    console.log('upload', file);
    console.log('config.uploadDir', config.upload.uploadDir);

    try {
      const prefix = result && result[1];
      const suffix = (result && result[2]) || '';
      // 存储到数据库的文件名
      const filenameStored = `${prefix}-${md5(filename + Date.now())}${suffix}`;
      await fsPromises.copyFile(
        filepath,
        path.resolve(config.upload.uploadDir, filenameStored)
      );

      return {
        filename: filenameStored,
        filepath: config.static.prefix + filenameStored,
      };
    } catch (err) {
      return {};
    } finally {
      ctx.cleanupRequestFiles(); // 删除临时文件
    }
  }
}

module.exports = FileService;
