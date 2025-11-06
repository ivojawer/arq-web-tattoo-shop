import express from "express";
import context from "./context.js";
import cors from "cors";
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

registerTattooRoutes(app, tattooService);
registerArtistaRoutes(app, artistaService);
registerEstiloRoutes(app, estiloService);

function errorHandler(err, req, res, next) {
  console.error(err);
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
