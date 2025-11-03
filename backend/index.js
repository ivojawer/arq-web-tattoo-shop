import express from "express";
import context from "./context.js";
import cors from "cors";
import createUsuarioService from "./entities/usuario/usuario.service.js";
import createArtistaService from "./entities/artista/artista.service.js";
import createArtistaFavoritoService from "./entities/artistaFavorito/artistaFavorito.service.js";
import createTattooService from "./entities/tattoo/tattoo.service.js";
import createEstiloArtistaService from "./entities/estiloArtista/estiloArtista.service.js";
import createEstiloTattooService from "./entities/estiloTattoo/estiloTattoo.service.js";
import createEstiloService from "./entities/estilo/estilo.service.js";

const usuarioService = createUsuarioService(context);
const artistaService = createArtistaService(context);
const artistaFavoritoService = createArtistaFavoritoService(context);
const estiloService = createEstiloService(context);
const tattooService = createTattooService(context, estiloService, artistaService);
const estiloArtistaService = createEstiloArtistaService(context);
const estiloTattooService = createEstiloTattooService(context);

const app = express();
const port = 3000;

app.use(express.json(), cors());


app.get("/health", (req, res) => res.send("Hello World!"));

function registerCrudRoutes(basePath, service) {
  app.get(basePath, (req, res) => res.status(200).json(service.list()));
  app.get(`${basePath}/:id`, (req, res) => {
    const item = service.getById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.status(200).json(item);
  });
  app.post(basePath, (req, res) => {
    const created = service.create(req.body);
    res.status(201).json(created);
  });
  app.put(`${basePath}/:id`, (req, res) => {
    const updated = service.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  });
  app.delete(`${basePath}/:id`, (req, res) => {
    const ok = service.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  });
}

// Register routes for each entity
registerCrudRoutes("/usuarios", usuarioService);
registerCrudRoutes("/artistas", artistaService);
registerCrudRoutes("/artistas-favoritos", artistaFavoritoService);
registerCrudRoutes("/tattoos", tattooService);
registerCrudRoutes("/estilos-artista", estiloArtistaService);
registerCrudRoutes("/estilos-tattoo", estiloTattooService);
registerCrudRoutes("/estilos", estiloService);

app.listen(port, (error) => {
  if(error){
    console.error('Error starting the server:', error);
    return;
  }
  console.log(`Example app listening on port ${port}`);
});
