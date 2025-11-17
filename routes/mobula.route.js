const _ = require('lodash');
const { CONFIG_ENV } = require('../config');
const { Router } = require('express');
const { requestIsEmpty, anyEmailRejected } = require('../common/validations');
const { createTransporter } = require('../email/transporter');
const { mobulaCommonTemplate } = require('../email/template/mobula');
const { SuccessResponseObject, ErrorResponseObject } = require('../common/http');

const MOBULA_PROD_ORIGIN = 'https://mobulaestudio.com';
const r = Router();

const mobulaTransporter = createTransporter({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: CONFIG_ENV.MOBULA_SENDER_EMAIL,
    pass: CONFIG_ENV.MOBULA_SENDER_PASSWORD,
  },
})

r.post('/', async (req, res) => {
  if (requestIsEmpty(req)) {
    return res
      .status(404)
      .json(new ErrorResponseObject('The body or files are required'))
  }

  const template = mobulaCommonTemplate(req?.body)
  const originName = req.get('origin')
  const sendEmailResponse = await mobulaTransporter.sendMail({
    from: `Un nuevo Email para mobula <${CONFIG_ENV.MOBULA_SENDER_EMAIL}>`,
    to: originName === MOBULA_PROD_ORIGIN ? env.MOBULA_TO_EMAIL : 'jose.morales@hermosasoftware.io',
    subject: 'Nuevo Email para mobula',
    html: template,
    attachments: filesToSent
  });

  if (!anyEmailRejected(sendEmailResponse)) {
    return res
      .status(404)
      .json(new ErrorResponseObject(`These emails were rejected ${sendEmailResponse?.rejected?.toString()}`))
  }

  return res.status(200).json(new SuccessResponseObject('Email send'))
});

module.exports = r;