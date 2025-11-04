const estilos = [
  {id: 1, name: 'Realismo', tagColor: '#FF5733'},
  {id: 2, name: 'Tradicional', tagColor: '#156b3c'},
  {id: 3, name: 'Acuarela', tagColor: '#3357FF'},
  {id: 4, name: 'Geométrico', tagColor: '#F1C40F'},
  {id: 5, name: 'Neotradicional', tagColor: '#8E44AD'}
];

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
