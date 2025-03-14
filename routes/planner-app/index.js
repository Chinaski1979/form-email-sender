const { Router } = require('express');
const feedbackRoute = require('./feedback.route');
const commissionReportRoute = require('./commission-report.route');
const confirmationEventRoute = require('./confirmation-event.route');

const r = Router();

r.use('/feedback', feedbackRoute);
r.use('/commission-report', commissionReportRoute);
r.use('/confirmation-event', confirmationEventRoute);

module.exports = r;
