const _ = require('lodash');
const { CONFIG_ENV } = require('../config');
const { Router } = require('express');
const { requestIsEmpty, anyEmailRejected } = require('../common/validations');
const { createTransporter } = require('../email/transporter');
const { tabstrCommonTemplate } = require('../email/template/tabstr');
const { SuccessResponseObject, ErrorResponseObject } = require('../common/http');

const TABSTR_PROD_ORIGIN = 'https://www.tabstr.net/';

const r = Router();

const propellaTransporter = createTransporter({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: CONFIG_ENV.PROPELLA_SENDER_EMAIL,
    pass: CONFIG_ENV.PROPELLA_SENDER_PASSWORD,
  },
})

r.post('/', async (req, res) => {
  if (requestIsEmpty(req)) {
    return res
      .status(404)
      .json(new ErrorResponseObject('The body or files are required'))
  }
  const originName = req.get('origin')
  const template = tabstrCommonTemplate(req?.body)
  const sendEmailResponse = await propellaTransporter.sendMail({
    from: `Un nuevo formulario desde tabstr <${CONFIG_ENV.PROPELLA_SENDER_EMAIL}>`,
    to: originName === TABSTR_PROD_ORIGIN ? env.PROPELLA_TO_EMAIL : 'jose.morales@hermosasoftware.io',
    subject: 'Nuevo formulario de contacto recibido',
    html: template
  });

  if (!anyEmailRejected(sendEmailResponse)) {
    return res
      .status(404)
      .json(new ErrorResponseObject(`These emails were rejected ${sendEmailResponse?.rejected?.toString()}`))
  }

  return res.status(200).json(new SuccessResponseObject('Email send'))
});

module.exports = r;