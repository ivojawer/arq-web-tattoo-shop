import nextId from '../../utils/next-id.js';

const artistas = [
  { id: 1, name: 'Juan Perez', bio: 'Artista con 10 años de experiencia en tatuajes tradicionales.' },
  { id: 2, name: 'Maria Gomez', bio: 'Especialista en realismo y retratos, trabaja con clientes desde 2015.' },
];

export const list = () => artistas;
export const getById = (id) => {
  const nid = Number(id);
  return artistas.find((a) => Number(a.id) === nid);
};
export const create = (item) => {
  const nid = nextId(artistas);
  const newItem = { id: typeof item.id !== 'undefined' ? item.id : nid, ...item };
  artistas.push(newItem);
  return newItem;
};
export const update = (id, patch) => {
  const nid = Number(id);
  const idx = artistas.findIndex((a) => Number(a.id) === nid);
  if (idx === -1) return null;
  artistas[idx] = { ...artistas[idx], ...patch };
  return artistas[idx];
};
export const remove = (id) => {
  const nid = Number(id);
  const idx = artistas.findIndex((a) => Number(a.id) === nid);
  if (idx === -1) return false;
  artistas.splice(idx, 1);
  return true;
};
