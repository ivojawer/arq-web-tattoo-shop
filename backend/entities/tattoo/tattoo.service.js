export default function createTattooService(context, estiloService, artistaService) {
  const repo = context.repos.tattoo;
  const list = () => {
    const tattoos = repo.list();
    return tattoos.map((tattoo) => {
      const estilos = estiloService.listByTattooId(tattoo.id);
        const artista = artistaService.getById(tattoo.artistaId);
      return {
        ...tattoo,
        estilos: estilos.map((e) => ({ id: e.id, name: e.name, tagColor: e.tagColor })),
        artista: { id: artista.id, name: artista.name },
      };
    });
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
