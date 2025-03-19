const { Router } = require('express');
const reportsRoute = require('./reports.route');
const feedbackRouteRoute = require('./feedback.route');
const reminderEventRoute = require('./reminder-event.route');
const confirmationEventRoute = require('./confirmation-event.route');

const r = Router();

r.use('/reports', reportsRoute);
r.use('/feedback', feedbackRouteRoute);
r.use('/reminder-event', reminderEventRoute);
r.use('/confirmation-email', confirmationEventRoute);

module.exports = r;
