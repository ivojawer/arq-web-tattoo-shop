// In-memory repository for Tattoo
const tattoos = [];

export const list = () => tattoos;
export const getById = (id) => tattoos.find((t) => t.id === id);
export const create = (item) => {
  tattoos.push(item);
  return item;
};
export const update = (id, patch) => {
  const idx = tattoos.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  tattoos[idx] = { ...tattoos[idx], ...patch };
  return tattoos[idx];
};
export const remove = (id) => {
  const idx = tattoos.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tattoos.splice(idx, 1);
  return true;
};
