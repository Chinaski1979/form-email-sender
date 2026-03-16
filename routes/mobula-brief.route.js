const { CONFIG_ENV } = require('../config');
const { Router } = require('express');
const { ErrorResponseObject } = require('../common/http');
const { mobulaBriefTemplate } = require('../email/template/mobula');
const { sharedJsonSender } = require('../common/sharedJsonSender');

const PROD_ORIGIN = 'https://mobulaestudio.com';
const r = Router();

r.post('/', async (req, res) => {
  try {
    await sharedJsonSender({
      req,
      res,
      subject: 'Nuevo Brief Mobula',
      fromText: 'Formulario Brief Mobula',
      PROD_URL: PROD_ORIGIN,
      fnTemplate: mobulaBriefTemplate,
      TO_EMAIL: (CONFIG_ENV.MOBULA_BRIEF_TO_EMAIL || '')
        .split(',')
        .map((e) => e.trim())
        .filter(Boolean)
        .join(', '),
      SENDER_EMAIL: CONFIG_ENV.MOBULA_SENDER_EMAIL,
      SENDER_PASSWORD: CONFIG_ENV.MOBULA_SENDER_PASSWORD,
      alwaysUseToEmail: true,
    });
  } catch (e) {
    console.error('Error on prepare the email', e);
    return res
      .status(500)
      .json(new ErrorResponseObject('Error on prepare the email'));
  }
});

module.exports = r;
