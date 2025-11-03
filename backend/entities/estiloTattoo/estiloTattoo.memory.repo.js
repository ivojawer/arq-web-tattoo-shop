// In-memory repository for EstiloTattoo (join-like entity)
const estilosTattoo = [
  { id: 1, tattooId: 1, estiloId: 1 },
  { id: 2, tattooId: 2, estiloId: 3 },
];

export const list = () => estilosTattoo;
export const listByTattooIds = (tattooId) =>
  estilosTattoo.filter((e) => e.tattooId === tattooId);
export const getById = (id) => estilosTattoo.find((e) => e.id === id);
export const create = (item) => {
  estilosTattoo.push(item);
  return item;
};
export const update = (id, patch) => {
  const idx = estilosTattoo.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  estilosTattoo[idx] = { ...estilosTattoo[idx], ...patch };
  return estilosTattoo[idx];
};
export const remove = (id) => {
  const idx = estilosTattoo.findIndex((e) => e.id === id);
  if (idx === -1) return false;
  estilosTattoo.splice(idx, 1);
  return true;
};
