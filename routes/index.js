const { Router } = require('express');
const propella = require('./propella.route');
const mobula = require('./mobula.route');
const mobulaBriefRoute = require('./mobula-brief.route');
const gastropark = require('./gastropark.route');
const mavAppRoute = require('./mav-app.route');
const hersoRoute = require('./herso.route');
const tabstrRoute = require('./tabstr.route');
const tabstrBriefRoute = require('./tabstr-brief.route');

const r = Router();

r.use('/propella', propella);
r.use('/mobula', mobula);
r.use('/mobula-brief', mobulaBriefRoute);
r.use('/gastropark', gastropark);
r.use('/mav-app', mavAppRoute);
r.use('/herso', hersoRoute);
r.use('/tabstr', tabstrRoute);
r.use('/tabstr-brief', tabstrBriefRoute);

module.exports = r;
