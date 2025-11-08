import express from "express";
import context from "./context.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import createArtistaService from "./entities/artista/artista.service.js";
import createTattooService from "./entities/tattoo/tattoo.service.js";
import createEstiloService from "./entities/estilo/estilo.service.js";

const artistaService = createArtistaService(context);
const estiloService = createEstiloService(context);
const tattooService = createTattooService(context, estiloService, artistaService);

import registerTattooRoutes from './controllers/tattoo.controller.js';
import registerArtistaRoutes from './controllers/artista.controller.js';
import registerEstiloRoutes from './controllers/estilo.controller.js';

const app = express();
const port = 3000;

app.use(express.json(), cors());

app.get("/health", (req, res) => res.send("Hello World!"));

try {
  const swaggerDocument = YAML.load('./openapi.yaml');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get('/openapi.json', (req, res) => res.json(swaggerDocument));
} catch (err) {
  console.warn('Swagger UI not available (openapi.yaml load failed):', err.message);
}

registerTattooRoutes(app, tattooService);
registerArtistaRoutes(app, artistaService);
registerEstiloRoutes(app, estiloService);

export class NotFoundError extends Error {}
export class BadRequestError extends Error {}
function errorHandler(err, req, res, next) {
  console.error(err);
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: 'Not found', message: err.message });
  }
  if (err instanceof BadRequestError) {
    return res.status(400).json({ error: 'Bad Request', message: err.message });
  }
  res.status(500).json({ error: 'Internal Server Error' });
}

app.use(errorHandler);

app.listen(port, (error) => {
  if(error){
    console.error('Error starting the server:', error);
    return;
  }
  console.log(`Example app listening on port ${port}`);
});
