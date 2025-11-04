const estilosArtista = [
  {id: 1, artistaId: 1, estiloId: 2},
  {id: 2, artistaId: 2, estiloId: 1}
];

export const list = () => estilosArtista;
export const getById = (id) => estilosArtista.find((e) => e.id === id);
export const create = (item) => {
  estilosArtista.push(item);
  return item;
};
export const update = (id, patch) => {
  const idx = estilosArtista.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  estilosArtista[idx] = { ...estilosArtista[idx], ...patch };
  return estilosArtista[idx];
};
export const remove = (id) => {
  const idx = estilosArtista.findIndex((e) => e.id === id);
  if (idx === -1) return false;
  estilosArtista.splice(idx, 1);
  return true;
};
