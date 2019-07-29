'use strict';

const Controller = require('../core/base-controller');
const { contactRule } = require('../common/validation/rules');

class ContactsController extends Controller {
  async index() {
    const { ctx, service } = this;

    const query = Object.assign({}, ctx.query, {
      page_num: parseInt(ctx.query.page_num),
      page_size: parseInt(ctx.query.page_size),
    });
    const contacts = await service.contacts.findBy(query);

    ctx.responseHandler[200](contacts);
  }

  async create() {
    const { ctx, service } = this;
    const contact = ctx.request.body;
    contact.create_time = contact.update_time = ctx.helper.formatTime();

    ctx.validate(contactRule, contact);
    const contactInfo = await service.contacts.save(contact);
    ctx.responseHandler[201](contactInfo);
  }

  async update() {
    const { ctx, service } = this;
    const contactParams = Object.assign(ctx.request.body, {
      update_time: ctx.helper.formatTime(),
    });

    await service.contacts.update(ctx.params.contact_id, contactParams);
    ctx.responseHandler[204]();
  }

  async remove() {
    const { ctx, service } = this;

    await service.contacts.remove(ctx.params.contact_id);
    ctx.responseHandler[204]();
  }
}

module.exports = ContactsController;
