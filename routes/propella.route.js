const { CONFIG_ENV } = require('../config');
const { Router } = require('express');
const { ErrorResponseObject } = require('../common/http');
const { propellaCommonTemplate } = require('../email/template/propella');
const { sharedJsonSender } = require('../common/sharedJsonSender');

const PROD_ORIGIN = 'https://www.propella.cr';

const r = Router();

r.post('/', async (req, res) => {
  try {
    await sharedJsonSender({
      req: req,
      res: res,
      subject: 'Nuevo formulario de contacto recibido',
      fromText: 'Un nuevo formulario desde Propella Website',
      PROD_URL: PROD_ORIGIN,
      fnTemplate: propellaCommonTemplate,
      TO_EMAIL: CONFIG_ENV.PROPELLA_TO_EMAIL,
      SENDER_EMAIL: CONFIG_ENV.PROPELLA_SENDER_EMAIL,
      SENDER_PASSWORD: CONFIG_ENV.PROPELLA_SENDER_PASSWORD,
    })
  } catch (e) {
    console.error('Error on prepare the email', e);
    return res
      .status(401)
      .json(new ErrorResponseObject('Error on prepare the email'));
  }
});

module.exports = r;