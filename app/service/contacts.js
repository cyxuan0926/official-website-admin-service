'use strict';

const Service = require('../core/base-service');

class ContactsService extends Service {
  async findBy(filter) {
    const { page_num, page_size } = filter;
    const querySql = `
      SELECT contact_id, contact_name, contact_tel, contact_region
      FROM tb_contacts
      ORDER BY create_time DESC
      LIMIT ? OFFSET ?;
    `;

    const total_rows = await this.getRows('tb_contacts');
    const contacts = await this.app.mysql.query(
      querySql,
      [ page_size, page_size * (page_num - 1) ]
    );

    return {
      data: contacts,
      meta: {
        pagination: {
          has_previous: page_num > 1,
          has_next: page_num * page_size < total_rows,
          page_size,
          page_num,
          total_rows,
          total_pages: Math.ceil(total_rows / page_size),
        },
      },
    };
  }

  async save(contact) {
    const result = await this.app.mysql.insert('tb_contacts', contact);

    return { contact_id: result.insertId };
  }

  async update(contact_id, contactParams) {
    const result = await this.app.mysql.update('tb_contacts', contactParams, {
      where: { contact_id },
    });

    return result.affectedRows === 1;
  }

  async remove(contact_id) {
    const result = await this.app.mysql.delete('tb_contacts', { contact_id });

    return result.affectedRows === 1;
  }
}

module.exports = ContactsService;
