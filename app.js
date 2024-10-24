const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const { ErrorResponseObject } = require('./common/http');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/', routes);

app.all('*', (req, res) => res.status(404).json(new ErrorResponseObject('route not defined')));

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});

module.exports = app;
