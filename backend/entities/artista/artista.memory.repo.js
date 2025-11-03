// In-memory repository for Artista
const artistas = [
  {id: 1, name: 'Juan Perez'},
  {id: 2, name: 'Maria Gomez'}
];

export const list = () => artistas;
export const getById = (id) => artistas.find((a) => a.id === id);
export const create = (item) => {
  artistas.push(item);
  return item;
};
export const update = (id, patch) => {
  const idx = artistas.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  artistas[idx] = { ...artistas[idx], ...patch };
  return artistas[idx];
};
export const remove = (id) => {
  const idx = artistas.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  artistas.splice(idx, 1);
  return true;
};
