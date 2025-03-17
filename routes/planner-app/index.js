const { Router } = require('express');
const feedbackRouteRoute = require('./feedback.route');
const reminderEventRoute = require('./reminder-event.route');
const commissionReportRoute = require('./commission-report.route');
const confirmationEventRoute = require('./confirmation-event.route');

const r = Router();

r.use('/feedback', feedbackRouteRoute);
r.use('/reminder-event', reminderEventRoute);
r.use('/commission-report', commissionReportRoute);
r.use('/confirmation-email', confirmationEventRoute);

module.exports = r;
