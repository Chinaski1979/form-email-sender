const { Router } = require('express');
const { SuccessResponseObject } = require('../common/http');
const demo = require('./demo.route');
const propella = require('./propella.route');
const mobula = require('./mobula.route');

const r = Router();

r.use('/demo', demo);
r.use('/propella', propella);
r.use('/mobula', mobula);

r.get('/', (req, res) => res.json(new SuccessResponseObject('express vercel boiler plate')));

module.exports = r;
