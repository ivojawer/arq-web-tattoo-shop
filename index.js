import express from "express";
import context from "./context.js";
import createUsuarioService from "./entities/usuario/usuario.service.js";
import createArtistaService from "./entities/artista/artista.service.js";
import createArtistaFavoritoService from "./entities/artistaFavorito/artistaFavorito.service.js";
import createTattooService from "./entities/tattoo/tattoo.service.js";
import createEstiloArtistaService from "./entities/estiloArtista/estiloArtista.service.js";
import createEstiloTattooService from "./entities/estiloTattoo/estiloTattoo.service.js";
import createEstiloService from "./entities/estilo/estilo.service.js";

// instantiate services with context
const usuarioService = createUsuarioService(context);
const artistaService = createArtistaService(context);
const artistaFavoritoService = createArtistaFavoritoService(context);
const tattooService = createTattooService(context);
const estiloArtistaService = createEstiloArtistaService(context);
const estiloTattooService = createEstiloTattooService(context);
const estiloService = createEstiloService(context);
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

// Helper to wire basic CRUD routes for an entity
function registerCrudRoutes(basePath, service) {
  app.get(basePath, (req, res) => res.json(service.list()));
  app.get(`${basePath}/:id`, (req, res) => {
    const item = service.getById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
