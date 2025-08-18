const _ = require('lodash');
const { CONFIG_ENV } = require('../config');
const { Router } = require('express');
const { requestIsEmpty, anyEmailRejected } = require('../common/validations');
const { createTransporter } = require('../email/transporter');
const { createFilesObjectFromReq } = require('../common/filesUtils');
const { hersoCommonTemplate } = require('../email/template/herso');
const { SuccessResponseObject, ErrorResponseObject } = require('../common/http');

const HERSO_PROD_ORIGIN = 'https://hermosasoftware.io/';
const r = Router();

const hersoTransporter = createTransporter({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: CONFIG_ENV.HERSO_SENDER_EMAIL,
    pass: CONFIG_ENV.HERSO_SENDER_PASSWORD,
  },
})

r.post('/', async (req, res) => {
  if (requestIsEmpty(req)) {
    return res
      .status(404)
      .json(new ErrorResponseObject('The fields are required'))
  }

  console.log({HERSO_SENDER_PASSWORD: CONFIG_ENV.HERSO_SENDER_PASSWORD, HERSO_SENDER_PASSWORD: CONFIG_ENV.HERSO_SENDER_PASSWORD,})

  const originName = req.get('origin')
  const template = hersoCommonTemplate(req?.body)
  const sendEmailResponse = await hersoTransporter.sendMail({
    from: `Un nuevo formulario desde la página de herso <${CONFIG_ENV.HERSO_SENDER_EMAIL}>`,
    to: originName === HERSO_PROD_ORIGIN ? env.HERSO_TO_EMAIL : 'jose.morales@hermosasoftware.io',
    subject: `Contacto HERSO page`,
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