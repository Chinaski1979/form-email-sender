const _ = require('lodash');
const { CONFIG_ENV } = require('../../config');
const { Router } = require('express');
const { anyEmailRejected } = require('../../common/validations');
const { plannerAppTransporter } = require('./../../email/transporter');
const { confirmationEventTemplate } = require('../../email/template/planner-app/confirmation-event');
const { SuccessResponseObject, ErrorResponseObject } = require('../../common/http');

// {
//     "recipient": "jose.morales@hermosasoftware.io",
//     "clientName": "Jose",
//     "clientEmail": "jose.morales@hermosasoftware.io",
//     "clientPhone": "84252398",
//     "startDate": "12-12-12",
//     "startTime": "12:12:12pm",
//     "locationName": "CR",
//     "headcount": {
//         "toddlers": "algo",
//         "adults": "15"
//     },
//     "menuName": "Comida",
//     "staff": { "name": "j", "lastName": "l" }
// }

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
    "clientName",
    "clientEmail",
    "clientPhone",
    "startDate",
    "startTime",
    "locationName",
    "headcount",
    "menuName",
    "eventTypeName",
    "serviceCharge",
    "additionalCharges",
    "grandTotal"
];

const r = Router();

r.post('/', async (req, res) => {
    const body = req.body;

    // Validate required fields only if it's not a parent event
    if (!body.isParentEvent) {
        requiredKeys.forEach((key) => {
            if (!key in body) {
                return res
                    .status(400)
                    .json(new ErrorResponseObject(`Field ${key} is required`));
            }
        });
    }

    // If it's a parent event, validate that it has children events
    if (body.isParentEvent && (!body.childrenEvents || !Array.isArray(body.childrenEvents) || body.childrenEvents.length === 0)) {
        return res
            .status(400)
            .json(new ErrorResponseObject('Children events are required for parent events'));
    }

    const template = confirmationEventTemplate(body);
    const sendEmailResponse = await plannerAppTransporter.sendMail({
        from: `Email for Event Confirmation. <${CONFIG_ENV.PLANNER_APP_SENDER_EMAIL}>`,
        to: body?.clientEmail,
        subject: body.isParentEvent ? "Multiple Events Confirmation" : "Event Confirmation",
        html: template
    });

    if (!anyEmailRejected(sendEmailResponse)) {
        return res
            .status(400)
            .json(new ErrorResponseObject(`These emails were rejected ${sendEmailResponse?.rejected?.toString()}`));
    }

    return res.status(200).json(new SuccessResponseObject('Email sent'));
});

module.exports = r; 