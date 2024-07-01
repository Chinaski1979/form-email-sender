import { cleanText } from "../../common/textUtils";

const { FORM_NAME_KEY } = require("../../common/variables");

export const propellaCommonTemplate = (reqBody) => {
  const fields = Object.entries(reqBody)

  const list = fields
    .filter(([key]) => key !== FORM_NAME_KEY)
    .map(([key, value]) => {
    const buffer = Buffer.from(key, 'latin1');
    const correctedText = buffer.toString('utf8');
    return (
      `<li> 
        <b>
          ${cleanText(correctedText)}: 
        </b>
        ${value}
      </li>`
    )
  })

  return `<ul>${list.join('')}</ul>`

}