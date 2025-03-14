const nodemailer = require("nodemailer");
const { CONFIG_ENV } = require('../config');

const createTransporter = nodemailer.createTransport;

const plannerAppTransporter = createTransporter({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: CONFIG_ENV.PLANNER_APP_SENDER_EMAIL,
        pass: CONFIG_ENV.PLANNER_APP_SENDER_PASSWORD,
    },
})

module.exports = { createTransporter, plannerAppTransporter };