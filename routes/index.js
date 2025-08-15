const { Router } = require('express');
const propella = require('./propella.route');
const mobula = require('./mobula.route');
const gastropark = require('./gastropark.route');
const mavAppRoute = require('./mav-app.route');
const hersoRoute = require('./herso.route');

const r = Router();

r.use('/propella', propella);
r.use('/mobula', mobula);
r.use('/gastropark', gastropark);
r.use('/mav-app', mavAppRoute);
r.use('/herso', hersoRoute);

module.exports = r;
