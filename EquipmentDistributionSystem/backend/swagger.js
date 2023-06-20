const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config();

const PORT = process.env.PORT;

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API Documentation',
            version: '1.0.0',
            description: 'Documentatio for NE Revision'
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        },
                    },
                },
                Employees: {
                    type: 'object',
                    properties: {
                        fullnames: {
                            type: 'integer'
                        },
                        nid: {
                            type: 'integer'
                        },
                        telephone: {
                            type: 'integer'
                        },
                        email: {
                            type: 'string'
                        },
                        department: {
                            type: 'string'
                        },
                        position: {
                            type: 'string'
                        },
                        manufacturer: {
                            type: 'string'
                        },
                        model: {
                            type: 'string'
                        },
                        serialNumber: {
                            type: 'number'
                        },
                    }
                }
            },
        },
    },
    apis: ['./src/routes/*.js']
};

const specs = swaggerJsDoc(options)

module.exports = (app) => {
    app.use('/api-docs',swaggerUi.serve)
    app.get('/api-docs', swaggerUi.setup(specs))
}
