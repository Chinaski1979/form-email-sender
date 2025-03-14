const _ = require('lodash');
const multer = require('multer');
const { CONFIG_ENV } = require('../../config');
const { Router } = require('express');
const { anyEmailRejected } = require('../../common/validations');
const { createFilesObjectFromReq } = require('../../common/filesUtils');
const { plannerAppTransporter } = require('../../email/transporter');
const { recipientMiddleware } = require('../../middleware/recipient');
const { commissionReportTemplate } = require('../../email/template/planner-app/commission-report');
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

const upload = multer();
const r = Router();

r.post('/', upload.any(), recipientMiddleware, async (req, res) => {
    const { recipient, ...rest } = req.body
    const template = commissionReportTemplate(rest);
    const filesToSent = createFilesObjectFromReq(req?.files);
    const sendEmailResponse = await plannerAppTransporter.sendMail({
        from: `Un nuevo email recibido desde planner app <${CONFIG_ENV.PLANNER_APP_SENDER_EMAIL}>`,
        to: recipient,
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