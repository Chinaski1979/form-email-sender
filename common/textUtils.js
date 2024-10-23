const { capitalize } = require('lodash');

const cleanText = (text) => {
  if(!text) return '';
  const cleanedKey = text?.replace(/wf-form-/gi, "")?.replace(/[-_]/gi, " ");
  return capitalize(cleanedKey)
}

module.exports = { cleanText };