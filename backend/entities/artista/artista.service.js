export default function createArtistaService(context) {
  const repo = context.repos.artista;
  const list = () => {
    const artistas = repo.list();
    return artistas.map((artista) => {
      const relaciones = context.repos.estiloArtista
        .list()
        .filter((r) => Number(r.artistaId) === Number(artista.id));
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
    const relaciones = context.repos.estiloArtista
      .list()
      .filter((r) => Number(r.artistaId) === Number(artista.id));
    const estilos = relaciones
      .map((r) => context.repos.estilo.getById(r.estiloId))
      .filter(Boolean)
      .map((e) => ({ id: e.id, name: e.name, tagColor: e.tagColor }));
    return { ...artista, estilos };
  };
  const create = (data) => {
    const { estilosIds, ...rest } = data || {};
    const created = repo.create(rest);

    if (estilosIds && Array.isArray(estilosIds)) {
      estilosIds.forEach((estiloId) => {
        context.repos.estiloArtista.create({
          artistaId: created.id,
          estiloId: Number(estiloId),
        });
      });
    }

    return created;
  };

  const update = (id, patch) => {
    if (patch && Array.isArray(patch.estilosIds)) {
      const existing = context.repos.estiloArtista
        .list()
        .filter((r) => r.artistaId === id);
      existing.forEach((r) => context.repos.estiloArtista.remove(r.id));

      patch.estilosIds.forEach((estiloId) => {
        context.repos.estiloArtista.create({
          artistaId: id,
          estiloId: Number(estiloId),
        });
      });

      const { estilosIds, ...rest } = patch;
      return repo.update(id, rest);
    }

    return repo.update(id, patch);
  };
  const remove = (id) => repo.remove(id);
  return { list, getById, create, update, remove };
}
