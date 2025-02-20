const _ = require('lodash');
const multer = require('multer');
const { CONFIG_ENV } = require('../config');
const { Router } = require('express');
const { requestIsEmpty, anyEmailRejected } = require('../common/validations');
const { createTransporter } = require('../email/transporter');
const { createFilesObjectFromReq } = require('../common/filesUtils');
const { SuccessResponseObject, ErrorResponseObject } = require('../common/http');
const { plannerAppCommonTemplate } = require('../email/template/planner-app');

const upload = multer();
const r = Router();

const gastroParkTransporter = createTransporter({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: CONFIG_ENV.PLANNER_APP_SENDER_EMAIL,
        pass: CONFIG_ENV.PLANNER_APP_SENDER_PASSWORD,
    },
})

r.post('/', upload.any(), async (req, res) => {
    if (requestIsEmpty(req)) {
        return res
            .status(400)
            .json(new ErrorResponseObject('The body or files are required'))
    } else if (!_.get(req, 'body.fields.recipient', false)) {
        res
            .status(400)
            .json(new ErrorResponseObject('The email recipient is required.'))
    }

    const filesToSent = createFilesObjectFromReq(req?.files);
    const template = plannerAppCommonTemplate(req?.body.fields)
    const sendEmailResponse = await gastroParkTransporter.sendMail({
        from: `Un nuevo email recibido desde planner app <${CONFIG_ENV.GASTROPARK_SENDER_EMAIL}>`,
        to: _.get(req, 'body.fields.recipient'),
        subject: `${req?.body.formName}`,
        html: template,
        attachments: filesToSent
    });

    if (!anyEmailRejected(sendEmailResponse)) {
        return res
            .status(400)
            .json(new ErrorResponseObject(`These emails were rejected ${sendEmailResponse?.rejected?.toString()}`))
    }

    return res.status(200).json(new SuccessResponseObject('Email send'))
});

module.exports = r;