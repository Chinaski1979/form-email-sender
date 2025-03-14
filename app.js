const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const helmet = require('helmet');
const cors = require('cors')
const { ErrorResponseObject } = require('./common/http');
const routes = require('./routes');
const plannerApproutes = require('./routes/planner-app');

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API of emails herso',
            version: '1.0.0',
            description: 'Documentación of the API with Swagger using Express',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo',
            },
        ],
    },
    apis: ['./routes/*.js'], // Aquí indicamos las rutas donde se documentarán las rutas de la API
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/', routes);
app.use('/planner-app', plannerApproutes);

app.all('*', (req, res) => res.status(404).json(new ErrorResponseObject('route not defined')));

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});

module.exports = app;
