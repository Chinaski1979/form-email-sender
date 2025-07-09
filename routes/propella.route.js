const _ = require('lodash');
const multer = require('multer');
const { CONFIG_ENV } = require('../config');
const { Router } = require('express');
const { requestIsEmpty, anyEmailRejected } = require('../common/validations');
const { createTransporter } = require('../email/transporter');
const { createFilesObjectFromReq } = require('../common/filesUtils');
const { propellaCommonTemplate } = require('../email/template/propella');
const { SuccessResponseObject, ErrorResponseObject } = require('../common/http');
const { webFlowMiddleware } = require('../middleware/webflow');

const PROPELLA_PROD_ORIGIN = 'https://www.propella.cr';

const upload = multer();
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

r.post('/', upload.any(), webFlowMiddleware, async (req, res) => {
  if (requestIsEmpty(req)) {
    return res
      .status(404)
      .json(new ErrorResponseObject('The body or files are required'))
  }
  const originName = req.get('origin')

  const filesToSent = createFilesObjectFromReq(req?.files);
  const template = propellaCommonTemplate(req?.body.fields)
  const sendEmailResponse = await propellaTransporter.sendMail({
    from: `Un nuevo formulario desde Webflow <${CONFIG_ENV.PROPELLA_SENDER_EMAIL}>`,
    to: originName === PROPELLA_PROD_ORIGIN ? env.PROPELLA_TO_EMAIL : 'jose.morales@hermosasoftware.io',
    subject: `Nombre del formulario ${req?.body.formName}`,
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