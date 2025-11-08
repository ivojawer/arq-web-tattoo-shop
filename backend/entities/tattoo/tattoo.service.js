export default function createTattooService(context, estiloService, artistaService) {
  const repo = context.repos.tattoo;
  const list = (estilosIds, artistaId) => {
    let plainTattoos = repo.list();

    if (typeof artistaId !== 'undefined' && artistaId !== null) {
      plainTattoos = plainTattoos.filter((t) => t.artistaId === artistaId);
    }

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
      return tattoos.filter((t) => t.estilos && t.estilos.some((e) => estilosIds.includes(e.id)));
    }

    return tattoos;
  };
  const getById = (id) => repo.getById(id);
  const create = (data) => {
    const { estilosIds, ...rest } = data || {};
    const created = repo.create(rest);

    if (estilosIds && Array.isArray(estilosIds)) {
      estilosIds.forEach((estiloId) => {
        context.repos.estiloTattoo.create({ tattooId: Number(created.id), estiloId: Number(estiloId) });
      });
    }

    return created;
  };

  const update = (id, patch) => {
    if (patch && Array.isArray(patch.estilosIds)) {
      const existing = context.repos.estiloTattoo.list().filter((r) => Number(r.tattooId) === Number(id));
      existing.forEach((r) => context.repos.estiloTattoo.remove(r.id));

      patch.estilosIds.forEach((estiloId) => {
        context.repos.estiloTattoo.create({ tattooId: Number(id), estiloId: Number(estiloId) });
      });

      const { estilosIds, ...rest } = patch;
      return repo.update(id, rest);
    }

    return repo.update(id, patch);
  };
  const remove = (id) => {
    context.repos.estiloTattoo.list().filter((r) => Number(r.tattooId) === Number(id)).forEach((r) => context.repos.estiloTattoo.remove(r.id));
    return repo.remove(id)
  };
  return { list, getById, create, update, remove };
}
