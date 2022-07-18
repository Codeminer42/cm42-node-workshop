const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const setupSwagger = ({ config, server }) => {
  const options = {
    swaggerDefinition: {
      info: {
        title: config.swagger.title,
        version: config.swagger.version,
      },
      basePath: config.swagger.basePath,
    },
    apis: config.swagger.apis,
  };

  const swaggerSpec = swaggerJSDoc(options);

  server.use(
    config.swagger.docEndpoint,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true })
  );
};

module.exports = { setupSwagger };
