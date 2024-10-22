const _ = require('lodash');
const { cleanText } = require('../common/textUtils');
const { FORM_NAME_KEY } = require("../common/variables");

function webFlowMiddleware(req, res, next) {
  const fields = Object.entries(req.body);
  const cleanedBody = fields
  .filter(([key]) => key !== FORM_NAME_KEY)
  .reduce((acc, [key, value]) => {
    const buffer = Buffer.from(key, 'latin1');
    const cleanedKey = buffer.toString('utf8');
    return {
      ...acc,
      fields: {
        ...acc.fields,
        [cleanedKey]: value,
      }
    };
  }, {formName: cleanText(_.get(req.body, FORM_NAME_KEY)), fields: {}});
  req.body = cleanedBody;
  next();
}

module.exports = { webFlowMiddleware };