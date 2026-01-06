const e = require('express');
const { SuccessResponseObject, ErrorResponseObject } = require('../common/http');
const { requestIsEmpty, anyEmailRejected } = require('../common/validations');
const { createTransporter } = require('../email/transporter');

const sharedJsonSender = async ({
  res,
  req,
  subject = '',
  fromText = '',
  PROD_URL = '',
  TO_EMAIL = '',
  SENDER_EMAIL = '',
  SENDER_PASSWORD = '',
  fnTemplate = (req) => {},
}) => {
  try {
    if (requestIsEmpty(req)) {
      return res
        .status(401)
        .json(new ErrorResponseObject('The body or files are required'))
    }

    if (!TO_EMAIL) return res.status(401).json(new ErrorResponseObject('TO_EMAIL is Requiered'));
    if (!SENDER_EMAIL) return res.status(401).json(new ErrorResponseObject('SENDER_EMAIL is Requiered'));
    if (!SENDER_PASSWORD) return res.status(401).json(new ErrorResponseObject('SENDER_PASSWORD is Requiered'));

    const transporter = createTransporter({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD,
      },
    })

    if (!transporter) return res.status(401).json(new ErrorResponseObject('Error on create transporter'));

    const originName = req.get('origin');
    const appEnv = req.get("X-App-Env");

    console.log('origin', originName);

    const template = fnTemplate(req?.body)

    const isProd = (originName === PROD_URL || appEnv === 'production');

    const sendEmailResponse = await transporter.sendMail({
      from: `${fromText} <${SENDER_EMAIL}>`,
      to: isProd ? TO_EMAIL : 'jose.morales@hermosasoftware.io',
      subject: subject,
      html: template
    });

    if (!anyEmailRejected(sendEmailResponse)) {
      return res
        .status(401)
        .json(new ErrorResponseObject(`These emails were rejected ${sendEmailResponse?.rejected?.toString()}`));
    }

    return res.status(200).json(new SuccessResponseObject({
      origin: originName,
      env: appEnv,
      message: "SUCCESS"
    }));
  } catch(e) {
    throw new Error(e);
  }

};

module.exports = { sharedJsonSender };