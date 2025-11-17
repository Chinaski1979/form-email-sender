const { CONFIG_ENV } = require('../config');
const { Router } = require('express');
const { ErrorResponseObject } = require('../common/http');
const { tabstrCommonTemplate } = require('../email/template/tabstr');
const { sharedJsonSender } = require('../common/sharedJsonSender');

const PROD_ORIGIN = 'https://www.tabstr.net';

const r = Router();

r.post('/', async (req, res) => {
  try {
    await sharedJsonSender({
      req: req,
      res: res,
      subject: 'Nuevo formulario de contacto recibido',
      fromText: 'Un nuevo formulario desde tabstr',
      PROD_URL: PROD_ORIGIN,
      fnTemplate: tabstrCommonTemplate,
      TO_EMAIL: CONFIG_ENV.TABSTR_TO_EMAIL,
      SENDER_EMAIL: CONFIG_ENV.TABSTR_SENDER_EMAIL,
      SENDER_PASSWORD: CONFIG_ENV.TABSTR_SENDER_PASSWORD,
    })
  } catch (e) {
    console.error('Error on prepare the email', e);
    return res
      .status(401)
      .json(new ErrorResponseObject('Error on prepare the email'));
  }
});

module.exports = r;