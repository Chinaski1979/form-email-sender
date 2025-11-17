const { CONFIG_ENV } = require('../config');
const { Router } = require('express');
const { ErrorResponseObject } = require('../common/http');
const { hersoCommonTemplate } = require('../email/template/herso');
const { sharedJsonSender } = require('../common/sharedJsonSender');

const PROD_ORIGIN = 'https://mobulaestudio.com';
const r = Router();

r.post('/', async (req, res) => {
  try {
    await sharedJsonSender({
      req: req,
      res: res,
      subject: 'Nuevo Email para mobula',
      fromText: 'Un nuevo Email para mobula',
      PROD_URL: PROD_ORIGIN,
      fnTemplate: hersoCommonTemplate,
      TO_EMAIL: CONFIG_ENV.MOBULA_TO_EMAIL,
      SENDER_EMAIL: CONFIG_ENV.MOBULA_SENDER_EMAIL,
      SENDER_PASSWORD: CONFIG_ENV.MOBULA_SENDER_PASSWORD,
    })
  } catch (e) {
    console.error('Error on prepare the email', e);
    return res
      .status(401)
      .json(new ErrorResponseObject('Error on prepare the email'));
  }
});

module.exports = r;