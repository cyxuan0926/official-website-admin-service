'use strict';

const accountRule = {
  username: { type: 'string', min: 4, max: 32 },
  password: { type: 'string', min: 8 },
};

const articleRule = {
  article_type_id: { type: 'number', min: 1 },
  article_title: { type: 'string', min: 1, max: 32 },
  article_subtitle: { type: 'string', min: 1, max: 32, required: false },
  article_author: { type: 'string', min: 1, max: 16, required: false },
  article_source: { type: 'string', min: 1, max: 255, required: false },
  article_content: { type: 'string', min: 1, max: 10 * 10000 },
  article_status: [ 1, 2, 3, 4 ], // 1草稿，2上线，3下线，4已删除
  article_istop: [ 0, 1 ], // 0不置顶，1置顶
  article_rank: { type: 'number', min: 1, max: 5, required: false },
  article_cover: { type: 'string', min: 1, max: 255, required: false },
  article_publish_time: 'datetime',
  create_time: 'datetime?',
  update_time: 'datetime',
};

module.exports = { articleRule, accountRule };
