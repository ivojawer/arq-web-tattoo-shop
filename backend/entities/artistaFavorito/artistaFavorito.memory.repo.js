// In-memory repository for ArtistaFavorito
const favoritos = [];

export const list = () => favoritos;
export const getById = (id) => favoritos.find((f) => f.id === id);
export const create = (item) => {
  favoritos.push(item);
  return item;
};
export const update = (id, patch) => {
  const idx = favoritos.findIndex((f) => f.id === id);
  if (idx === -1) return null;
  favoritos[idx] = { ...favoritos[idx], ...patch };
  return favoritos[idx];
};
export const remove = (id) => {
  const idx = favoritos.findIndex((f) => f.id === id);
  if (idx === -1) return false;
  favoritos.splice(idx, 1);
  return true;
};
