const { size } = require("lodash")

export const createFilesObjectFromReq = (filesReq) => {
  if (!size(filesReq)) return [];
  return filesReq.map((file) => {
    const base64Format = Buffer.from(file.buffer, 'ascii').toString('base64')
    return {
      filename: file.originalname,
      content: base64Format,
      encoding: 'base64'
    }
  })
}