import nextId from '../../utils/next-id.js';
import { NotFoundError } from '../../index.js';

const estilos = [
  { id: 1, name: 'Realismo', tagColor: '#FF5733' },
  { id: 2, name: 'Tradicional', tagColor: '#156b3c' },
  { id: 3, name: 'Acuarela', tagColor: '#3357FF' },
  { id: 4, name: 'Geométrico', tagColor: '#F1C40F' },
  { id: 5, name: 'Neotradicional', tagColor: '#8E44AD' },
];

export const list = () => estilos;
export const getById = (id) => {
  const nid = Number(id);
  const estilo = estilos.find((e) => Number(e.id) === nid);
  if(!estilo){
    throw new NotFoundError(`Estilo with id ${id} not found`);
  }
  return estilo;
};
export const create = (item) => {
  const nid = nextId(estilos);
  const newItem = { id: typeof item.id !== 'undefined' ? item.id : nid, ...item };
  estilos.push(newItem);
  return newItem;
};
export const update = (id, patch) => {
  const nid = Number(id);
  const idx = estilos.findIndex((e) => Number(e.id) === nid);
  if (idx === -1) return null;
  estilos[idx] = { ...estilos[idx], ...patch };
  return estilos[idx];
};
export const remove = (id) => {
  const nid = Number(id);
  const idx = estilos.findIndex((e) => Number(e.id) === nid);
  if (idx === -1) return false;
  estilos.splice(idx, 1);
  return true;
};
