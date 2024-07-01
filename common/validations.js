const { isEmpty } = require("lodash")

export const requestIsEmpty = (req) => {
  const bodyIsEmpty = isEmpty(req?.body);
  const filesIsEmpty = isEmpty(req?.files);
  return bodyIsEmpty && filesIsEmpty
}

export const anyEmailRejected = ({ rejected }) => isEmpty(rejected)