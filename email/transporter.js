const nodemailer = require("nodemailer");

const createTransporter = nodemailer.createTransport;

module.exports = { createTransporter };