import express from "express";
import * as usuarioService from "./entities/usuario/usuario.service.js";
import * as artistaService from "./entities/artista/artista.service.js";
import * as artistaFavoritoService from "./entities/artistaFavorito/artistaFavorito.service.js";
import * as tattooService from "./entities/tattoo/tattoo.service.js";
import * as estiloArtistaService from "./entities/estiloArtista/estiloArtista.service.js";
import * as estiloTattooService from "./entities/estiloTattoo/estiloTattoo.service.js";
import * as estiloService from "./entities/estilo/estilo.service.js";
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
