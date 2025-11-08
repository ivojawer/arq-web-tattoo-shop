import nextId from '../../utils/next-id.js';

const estilosArtista = [
  { id: 1, artistaId: 1, estiloId: 2 },
  { id: 2, artistaId: 2, estiloId: 1 },
];

export const list = () => estilosArtista;
export const getById = (id) => {
  const nid = Number(id);
  return estilosArtista.find((e) => Number(e.id) === nid);
};
export const create = (item) => {
  const nid = nextId(estilosArtista);
  const newItem = { id: typeof item.id !== 'undefined' ? item.id : nid, ...item };
  estilosArtista.push(newItem);
  return newItem;
};
export const update = (id, patch) => {
  const nid = Number(id);
  const idx = estilosArtista.findIndex((e) => Number(e.id) === nid);
  if (idx === -1) return null;
  estilosArtista[idx] = { ...estilosArtista[idx], ...patch };
  return estilosArtista[idx];
};
export const remove = (id) => {
  const nid = Number(id);
  const idx = estilosArtista.findIndex((e) => Number(e.id) === nid);
  if (idx === -1) return false;
  estilosArtista.splice(idx, 1);
  return true;
};
