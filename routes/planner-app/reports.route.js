const _ = require('lodash');
const { CONFIG_ENV } = require('../../config');
const { Router } = require('express');
const { anyEmailRejected } = require('../../common/validations');
const { plannerAppTransporter } = require('../../email/transporter');
const { toMiddleware } = require('../../middleware/to');
const { commissionReportTemplate } = require('../../email/template/planner-app/commission-report');
const { staffPaymentReportTemplate } = require('../../email/template/planner-app/staff-payment-report');
const { SuccessResponseObject, ErrorResponseObject } = require('../../common/http');

/**
 * @swagger
 * /planner-app:
 *   post:
 *     summary: Send an email for a planner app customer.
 *     description: This endpoint sends an email to the specified customer, optionally attaching a file.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               recipient:
 *                 type: string
 *                 format: email
 *                 example: 'customer@example.com'
 *                 description: 'The email address of the customer to whom the email will be sent.'
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: 'Optional attachment file to include in the email.'
 *             required:
 *               - recipient
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'Email sent successfully'
 *       400:
 *         description: Bad request (e.g., missing required fields or invalid file format)
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'Invalid request, missing recipient or invalid file format'
 *       500:
 *         description: Server error (e.g., failure to send email)
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'Internal server error'
 */

const requiredKeys = [
    "to",
    "subject",
    "startDate",
    "endDate",
    "templateType",
    "attachments",
]

const staffPaymentReport = 'staff-payment-report';
const commisionReport = 'commision-report';

const validTemplates = [staffPaymentReport, commisionReport]

const r = Router();

r.post('/', toMiddleware, async (req, res) => {
    const body = req.body
    requiredKeys.forEach((key) => {
        if (!(key in req.body)) {
            return res
                .status(400)
                .json(new ErrorResponseObject(`Field ${key} is requiered`));
        }
    })

    if (!validTemplates.includes(body.templateType)) {
        return res
                .status(400)
                .json(new ErrorResponseObject(`${body.templateType} is not a valid template`));
    }

    const template = body.templateType === commisionReport 
        ? commissionReportTemplate(body) 
        : staffPaymentReportTemplate(body);
    const sendEmailResponse = await plannerAppTransporter.sendMail({
        from: `Un nuevo email recibido desde planner app <${CONFIG_ENV.PLANNER_APP_SENDER_EMAIL}>`,
        to: body.to,
        subject: body.subject,
        html: template,
        attachments: body.attachments.map(attachment => ({
            filename: attachment.filename,
            content: Buffer.from(attachment.content, 'base64'),
            contentType: attachment.contentType
        }))
    });

    if (!anyEmailRejected(sendEmailResponse)) {
        return res
            .status(400)
            .json(new ErrorResponseObject(`These emails were rejected ${sendEmailResponse?.rejected?.toString()}`))
    }

    return res.status(200).json(new SuccessResponseObject('Email send'))
});

module.exports = r;