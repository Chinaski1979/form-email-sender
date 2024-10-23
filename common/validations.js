const { isEmpty } = require("lodash");

const requestIsEmpty = (req) => {
  const bodyIsEmpty = isEmpty(req?.body);
  const filesIsEmpty = isEmpty(req?.files);
  return bodyIsEmpty && filesIsEmpty;
};

const anyEmailRejected = ({ rejected }) => isEmpty(rejected);

module.exports = {
  requestIsEmpty,
  anyEmailRejected,
};