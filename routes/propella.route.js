const _ = require('lodash');
const multer = require('multer');
const { env } = require('../config');
const { Router } = require('express');
const { cleanText } = require('../common/textUtils');
const { FORM_NAME_KEY } = require('../common/variables');
const { requestIsEmpty, anyEmailRejected } = require('../common/validations');
const { createTransporter } = require('../email/transporter');
const { createFilesObjectFromReq } = require('../common/filesUtils');
const { propellaCommonTemplate } = require('../email/template/propella');
const { SuccessResponseObject, ErrorResponseObject } = require('../common/http');

const upload = multer();
const r = Router();

const propellaTransporter = createTransporter({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.PROPELLA_SENDER_EMAIL,
    pass: env.PROPELLA_SENDER_PASSWORD,
  },
})

r.post('/', upload.any(), async (req, res) => {
  if (requestIsEmpty(req)) {
    return res
      .status(404)
      .json(new ErrorResponseObject('The body or files are required'))
  }

  const formName = _.get(req?.body, FORM_NAME_KEY);
  const filesToSent = createFilesObjectFromReq(req?.files);
  const template = propellaCommonTemplate(req?.body)
  const sendEmailResponse = await propellaTransporter.sendMail({
    from: `Un nuevo formulario desde Webflow <${env.PROPELLA_SENDER_EMAIL}>`,
    to: env.PROPELLA_TO_EMAIL,
    subject: `Nombre del formulario ${cleanText(formName)}`,
    html: template,
    attachments: filesToSent
  });

  if (!anyEmailRejected(sendEmailResponse)) {
    return res
      .status(404)
      .json(new ErrorResponseObject(`These emails were rejected ${sendEmailResponse?.rejected?.toString()}`))
  }

  return res.status(200).json(new SuccessResponseObject('Email send', {}))
});

module.exports = r;