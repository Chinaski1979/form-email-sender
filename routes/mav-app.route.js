const _ = require('lodash');
const { CONFIG_ENV } = require('../config');
const { Router } = require('express');
const { anyEmailRejected } = require('../common/validations');
const { createTransporter } = require('../email/transporter');
const { SuccessResponseObject, ErrorResponseObject } = require('../common/http');

const r = Router();

const mavAppTransporter = createTransporter({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: CONFIG_ENV.MAV_APP_SENDER_EMAIL,
        pass: CONFIG_ENV.MAV_APP_SENDER_PASSWORD,
    },
})

const requiredKeys = [
    "to",
    "from",
    "subject",
    "template",
];

r.post('/', async (req, res) => {
    const body = req.body;
    
    for (const key of requiredKeys) {
        if (!(key in body)) {
            return res
                .status(400)
                .json(new ErrorResponseObject(`Field '${key}' is required`));
        } else if (typeof body[key] !== "string") {
            return res
                .status(400)
                .json(new ErrorResponseObject(`Key '${key}' must be a string`));
        }
    }

    const { to, template, subject, from } = body;
    
    const sendEmailResponse = await mavAppTransporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: template,
    });

    if (!anyEmailRejected(sendEmailResponse)) {
        return res
            .status(400)
            .json(new ErrorResponseObject(`These emails were rejected ${sendEmailResponse?.rejected?.toString()}`))
    }

    return res.status(200).json(new SuccessResponseObject('Email send'))
});

module.exports = r;