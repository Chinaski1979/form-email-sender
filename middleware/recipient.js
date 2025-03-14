const _ = require('lodash');

function recipientMiddleware(req, res, next) {
  if (!_.get(req, 'body.recipient', false)) {
    res
      .status(400)
      .json(new ErrorResponseObject('The email recipient is required.'))
  }
  next();
}

module.exports = { recipientMiddleware };