import * as artistaRepo from "./entities/artista/artista.memory.repo.js";
import * as tattooRepo from "./entities/tattoo/tattoo.memory.repo.js";
import * as estiloArtistaRepo from "./entities/estiloArtista/estiloArtista.memory.repo.js";
import * as estiloTattooRepo from "./entities/estiloTattoo/estiloTattoo.memory.repo.js";
import * as estiloRepo from "./entities/estilo/estilo.memory.repo.js";

export const context = {
  repos: {
    artista: artistaRepo,
    tattoo: tattooRepo,
    estiloArtista: estiloArtistaRepo,
    estiloTattoo: estiloTattooRepo,
    estilo: estiloRepo,
  },
};

export default context;
