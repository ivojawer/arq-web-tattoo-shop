// In-memory repository for Estilo
const estilos = [];

export const list = () => estilos;
export const getById = (id) => estilos.find((e) => e.id === id);
export const create = (item) => {
  estilos.push(item);
  return item;
};
export const update = (id, patch) => {
  const idx = estilos.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  estilos[idx] = { ...estilos[idx], ...patch };
  return estilos[idx];
};
export const remove = (id) => {
  const idx = estilos.findIndex((e) => e.id === id);
  if (idx === -1) return false;
  estilos.splice(idx, 1);
  return true;
};
