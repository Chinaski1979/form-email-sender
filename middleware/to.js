const { ErrorResponseObject } = require('../common/http');
const _ = require('lodash');

function toMiddleware(req, res, next) {
  if (!_.get(req, 'body.to', false)) {
    res
      .status(400)
      .json(new ErrorResponseObject('The email to is required.'))
  }
  next();
}

module.exports = { toMiddleware };