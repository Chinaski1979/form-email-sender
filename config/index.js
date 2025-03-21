require('dotenv').config();

const CONFIG_ENV = {
  PROPELLA_TO_EMAIL: process.env.PROPELLA_TO_EMAIL,
  PROPELLA_SENDER_EMAIL: process.env.PROPELLA_SENDER_EMAIL,
  PROPELLA_SENDER_PASSWORD: process.env.PROPELLA_SENDER_PASSWORD,
  MOBULA_TO_EMAIL: process.env.MOBULA_TO_EMAIL,
  MOBULA_SENDER_EMAIL: process.env.MOBULA_SENDER_EMAIL,
  MOBULA_SENDER_PASSWORD: process.env.MOBULA_SENDER_PASSWORD,
  GASTROPARK_TO_EMAIL: process.env.GASTROPARK_TO_EMAIL,
  GASTROPARK_SENDER_EMAIL: process.env.GASTROPARK_SENDER_EMAIL,
  GASTROPARK_SENDER_PASSWORD: process.env.GASTROPARK_SENDER_PASSWORD,
  PLANNER_APP_SENDER_EMAIL: process.env.PLANNER_APP_SENDER_EMAIL,
  PLANNER_APP_SENDER_PASSWORD: process.env.PLANNER_APP_SENDER_PASSWORD,
  MAV_APP_SENDER_EMAIL: process.env.MAV_APP_SENDER_EMAIL,
  MAV_APP_SENDER_PASSWORD: process.env.MAV_APP_SENDER_PASSWORD,
};

module.exports = { CONFIG_ENV };
