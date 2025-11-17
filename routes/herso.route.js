const { CONFIG_ENV } = require('../config');
const { Router } = require('express');
const { hersoCommonTemplate } = require('../email/template/herso');
const { ErrorResponseObject } = require('../common/http');
const { sharedJsonSender } = require('../common/sharedJsonSender');

const PROD_ORIGIN = 'https://www.hermosasoftware.io';
const r = Router();

r.post('/', async (req, res) => {
  try {
    await sharedJsonSender({
      req: req,
      res: res,
      subject: 'Contacto HERSO page',
      fromText: 'Un nuevo formulario desde la página de herso',
      PROD_URL: PROD_ORIGIN,
      fnTemplate: hersoCommonTemplate,
      TO_EMAIL: CONFIG_ENV.HERSO_TO_EMAIL,
      SENDER_EMAIL: CONFIG_ENV.HERSO_SENDER_EMAIL,
      SENDER_PASSWORD: CONFIG_ENV.HERSO_SENDER_PASSWORD,
    })
  } catch (e) {
    console.error('Error on prepare the email', e);
    return res
      .status(401)
      .json(new ErrorResponseObject('Error on prepare the email'));
  }
});

module.exports = r;