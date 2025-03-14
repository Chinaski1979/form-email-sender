const { Router } = require('express');
const { SuccessResponseObject } = require('../common/http');
const propella = require('./propella.route');
const mobula = require('./mobula.route');
const gastropark = require('./gastropark.route');
const plannerApp = require('./planner-app.route');

const r = Router();

r.use('/propella', propella);
r.use('/mobula', mobula);
r.use('/gastropark', gastropark);
r.use('/planner-app', plannerApp);

r.get('/', (req, res) => res.json(new SuccessResponseObject('express vercel boiler plate')));

module.exports = r;
