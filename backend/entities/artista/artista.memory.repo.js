const artistas = [
  { id: 1, name: 'Juan Perez', bio: 'Artista con 10 años de experiencia en tatuajes tradicionales.' },
  { id: 2, name: 'Maria Gomez', bio: 'Especialista en realismo y retratos, trabaja con clientes desde 2015.' }
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
