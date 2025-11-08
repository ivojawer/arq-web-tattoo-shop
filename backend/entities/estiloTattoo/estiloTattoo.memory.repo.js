import nextId from '../../utils/next-id.js';

const estilosTattoo = [
  { id: 1, tattooId: 1, estiloId: 1 },
  { id: 2, tattooId: 2, estiloId: 3 },
  { id: 3, tattooId: 1, estiloId: 3 },
  { id: 4, tattooId: 3, estiloId: 2 },
];

export const list = () => estilosTattoo;
export const listByTattooIds = (tattooId) =>
  estilosTattoo.filter((e) => Number(e.tattooId) === Number(tattooId));
export const getById = (id) => {
  const nid = Number(id);
  return estilosTattoo.find((e) => Number(e.id) === nid);
};
export const create = (item) => {
  const nid = nextId(estilosTattoo);
  const newItem = { id: typeof item.id !== 'undefined' ? item.id : nid, ...item };
  estilosTattoo.push(newItem);
  return newItem;
};
export const update = (id, patch) => {
  const nid = Number(id);
  const idx = estilosTattoo.findIndex((e) => Number(e.id) === nid);
  if (idx === -1) return null;
  estilosTattoo[idx] = { ...estilosTattoo[idx], ...patch };
  return estilosTattoo[idx];
};
export const remove = (id) => {
  const nid = Number(id);
  const idx = estilosTattoo.findIndex((e) => Number(e.id) === nid);
  if (idx === -1) return false;
  estilosTattoo.splice(idx, 1);
  return true;
};
