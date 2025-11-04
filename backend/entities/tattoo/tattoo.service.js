export default function createTattooService(context, estiloService, artistaService) {
  const repo = context.repos.tattoo;
  const list = (estilosIds) => {
    const plainTattoos = repo.list();
    const tattoos = plainTattoos.map((tattoo) => {
      const estilos = estiloService.listByTattooId(tattoo.id);
      const artista = artistaService.getById(tattoo.artistaId);
      return {
        ...tattoo,
        estilos: estilos.map((e) => ({ id: e.id, name: e.name, tagColor: e.tagColor })),
        artista: artista ? { id: artista.id, name: artista.name } : null,
      };
    });
    if (estilosIds && estilosIds.length) {
      return tattoos.filter((t) => t.estilos && t.estilos.some((e) => estilosIds.includes(String(e.id))));
    }
    return tattoos;
  };
  const getById = (id) => repo.getById(id);
  const create = (data) => {
    const id = Date.now().toString();
    const item = { id, ...data };
    return repo.create(item);
  };
  const update = (id, patch) => repo.update(id, patch);
  const remove = (id) => repo.remove(id);
  return { list, getById, create, update, remove };
}
