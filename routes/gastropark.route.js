const _ = require('lodash');
const multer = require('multer');
const { CONFIG_ENV } = require('../config');
const { Router } = require('express');
const { requestIsEmpty, anyEmailRejected } = require('../common/validations');
const { createTransporter } = require('../email/transporter');
const { createFilesObjectFromReq } = require('../common/filesUtils');
const { gastroparkCommonTemplate } = require('../email/template/gastropark');
const { SuccessResponseObject, ErrorResponseObject } = require('../common/http');
const { framerMiddleware } = require('../middleware/framer');

const upload = multer();
const r = Router();

const gastroParkTransporter = createTransporter({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: CONFIG_ENV.GASTROPARK_SENDER_EMAIL,
        pass: CONFIG_ENV.GASTROPARK_SENDER_PASSWORD,
    },
})

r.post('/', upload.any(), framerMiddleware, async (req, res) => {
    if (requestIsEmpty(req)) {
        return res
            .status(404)
            .json(new ErrorResponseObject('The body or files are required'))
    }

    const filesToSent = createFilesObjectFromReq(req?.files);
    const template = gastroparkCommonTemplate(req?.body.fields)
    const sendEmailResponse = await gastroParkTransporter.sendMail({
        from: `Un nuevo formulario recibido desde gastro park <${CONFIG_ENV.GASTROPARK_SENDER_EMAIL}>`,
        to: CONFIG_ENV.GASTROPARK_TO_EMAIL,
        subject: `Nombre del formulario ${req?.body.formName}`,
        html: template,
        attachments: filesToSent
    });

    if (!anyEmailRejected(sendEmailResponse)) {
        return res
            .status(404)
            .json(new ErrorResponseObject(`These emails were rejected ${sendEmailResponse?.rejected?.toString()}`))
    }

    return res.status(200).json(new SuccessResponseObject('Email send'))
});

module.exports = r;