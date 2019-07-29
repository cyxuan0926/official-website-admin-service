'use strict';

const path = require('path');
const md5 = require('md5');
const fsPromises = require('fs').promises;
// const Service = require('egg').Service;
const Service = require('../core/base-service');

class FileService extends Service {
  async save() {
    const { ctx } = this;
    return this._storeFile(ctx.request.files[0]);
  }

  async remove(file_path) {
    const { config, app } = this;

    try {
      // for (let i = 0; i < fileList.length; i++) {
      //   const file_path = fileList[i].file_path;
      //   const result = file_path.match(/^.*\/(.+)$/);
      //   const file_name = result && result[1];
      //   console.log('file_name', file_name);
      //   await fsPromises.unlink(
      //     path.resolve(config.upload.uploadDir, file_name)
      //   );
      //   await app.mysql.delete('tb_files', { file_path });
      // }

      // const file_path = fileList[i].file_path;
      const result = file_path.match(/^.*\/(.+)$/);
      const file_name = result && result[1];
      await fsPromises.unlink(
        path.resolve(config.upload.uploadDir, file_name)
      );
      await app.mysql.delete('tb_files', { file_path });
    } catch (err) {
      throw err;
    }
  }

  async _storeFile(file) {
    const { ctx, config, app } = this;
    const { filename, filepath, mimeType } = file;
    const matchResult = filename.match(/^(.+?)(\.\w+)?$/);
    // const imageSuffix = [ '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.wbmp', '.webp', '.svg' ];

    try {
      const prefix = matchResult && matchResult[1];
      const suffix = (matchResult && matchResult[2]) || '';
      const file_id = md5(filename + Date.now());

      const file_name = `${prefix}-${file_id}${suffix}`;
      await fsPromises.copyFile(
        filepath,
        path.resolve(config.upload.uploadDir, file_name)
      );
      await app.mysql.insert('tb_files', {
        file_id,
        file_name,
        file_path: config.static.prefix + file_name,
        file_content_type: mimeType,
        create_time: ctx.helper.formatTime(),
        update_time: ctx.helper.formatTime(),
      });

      return {
        file_id,
        file_name,
        file_path: config.static.prefix + file_name,
        file_content_type: mimeType,
      };
    } catch (err) {
      throw err;
    } finally {
      ctx.cleanupRequestFiles(); // 删除临时文件
    }
  }
}

module.exports = FileService;
