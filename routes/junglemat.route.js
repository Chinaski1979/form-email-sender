const { CONFIG_ENV } = require('../config');
const { Router } = require('express');
const { ErrorResponseObject } = require('../common/http');
const { junglematCommonTemplate } = require('../email/template/junglemat');
const { sharedJsonSender } = require('../common/sharedJsonSender');

const PROD_ORIGIN = 'https://junglemat.com';
const r = Router();

r.post('/', async (req, res) => {
  try {
    await sharedJsonSender({
      req: req,
      res: res,
      subject: 'Nuevo formulario de contacto recibido',
      fromText: 'Un nuevo formulario desde JungleMat Website',
      PROD_URL: PROD_ORIGIN,
      fnTemplate: junglematCommonTemplate,
      TO_EMAIL: CONFIG_ENV.JUNGLEMAT_TO_EMAIL,
      SENDER_EMAIL: CONFIG_ENV.JUNGLEMAT_SENDER_EMAIL,
      SENDER_PASSWORD: CONFIG_ENV.JUNGLEMAT_SENDER_PASSWORD,
    })
  } catch (e) {
    console.error('Error on prepare the email', e);
    return res
      .status(403)
      .json(new ErrorResponseObject('Error on prepare the email'));
  }
});

module.exports = r;
