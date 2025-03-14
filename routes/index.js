const { Router } = require('express');
const propella = require('./propella.route');
const mobula = require('./mobula.route');
const gastropark = require('./gastropark.route');

const r = Router();

r.use('/propella', propella);
r.use('/mobula', mobula);
r.use('/gastropark', gastropark);

module.exports = r;
