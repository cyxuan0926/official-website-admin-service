'use strict';

const path = require('path');
const md5 = require('md5');
// const fsPromises = require('fs').promises;
const fs = require('fs');
const Service = require('../core/base-service');

class FileService extends Service {
  async save() {
    const { ctx } = this;
    return this._storeFile(ctx.request.files[0]);
  }

  async remove(files) {
    const { config, app } = this;

    files.forEach(async file => {
      try {
        const result = file.file_path.match(/^.*\/(.+)$/);
        const file_name = result && result[1];

        await this.unlink(path.resolve(config.upload.uploadDir, file_name));
        // await fsPromises.unlink(
        //   path.resolve(config.upload.uploadDir, file_name)
        // );
        await app.mysql.delete('tb_files', { file_path: file.file_path });
      } catch (err) {
        throw err;
      }
    });
  }

  async _storeFile(file) {
    const { ctx, config, app } = this;
    const { filename, filepath, mimeType } = file;
    const matchResult = filename.match(/^(.+?)(\.\w+)?$/);
    // const imageSuffix = [ '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.wbmp', '.webp', '.svg' ];

    try {
      const suffix = (matchResult && matchResult[2]) || '';
      const file_id = md5(filename + Date.now());
      const file_name = `${file_id}${suffix}`;

      await this.copyFile(
        filepath,
        path.resolve(config.upload.uploadDir, file_name)
      );
      // await fsPromises.copyFile(
      //   filepath,
      //   path.resolve(config.upload.uploadDir, file_name)
      // );
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

  unlink(path) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, err => {
        err ? reject(err) : resolve(true);
      });
    });
  }

  copyFile(src, dest) {
    return new Promise((resolve, reject) => {
      fs.copyFile(src, dest, err => {
        err ? reject(err) : resolve(true);
      });
    });
  }
}

module.exports = FileService;
