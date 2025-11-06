export default function createArtistaService(context) {
  const repo = context.repos.artista;
  const list = () => {
    const artistas = repo.list();
    return artistas.map((artista) => {
      const relaciones = context.repos.estiloArtista.list().filter((r) => r.artistaId === artista.id);
      const estilos = relaciones
        .map((r) => context.repos.estilo.getById(r.estiloId))
        .filter(Boolean)
        .map((e) => ({ id: e.id, name: e.name, tagColor: e.tagColor }));
      return { ...artista, estilos };
    });
  };

  const getById = (id) => {
    const artista = repo.getById(id);
    if (!artista) return null;
    const relaciones = context.repos.estiloArtista.list().filter((r) => r.artistaId === artista.id);
    const estilos = relaciones
      .map((r) => context.repos.estilo.getById(r.estiloId))
      .filter(Boolean)
      .map((e) => ({ id: e.id, name: e.name, tagColor: e.tagColor }));
    return { ...artista, estilos };
  };
  const create = (data) => {
    const id = Date.now().toString();
    const item = { id, ...data };
    return repo.create(item);
  };
  const update = (id, patch) => repo.update(id, patch);
  const remove = (id) => repo.remove(id);
  return { list, getById, create, update, remove };
}
