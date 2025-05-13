const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GeekUp E-commerce API',
      version: '1.0.0',
      description: 'API documentation for GeekUp E-commerce backend',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Đường dẫn tới các file có comment swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
