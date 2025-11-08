import nextId from '../../utils/next-id.js';

const tattoos = [
  {
    id: 1,
    name: "Tatuaje de ejemplo",
    image: "https://m.media-amazon.com/images/I/61wTUUXLnLL.jpg",
    description: "Un tatuaje de ejemplo para demostrar el repositorio en memoria.",
    artistaId: 1,
  },
  {
    id: 2,
    name: "Tatuaje de muestra",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThh1EQ_5yiYTgcXPbNINVOObbOvXmfuq9uRQ&s",
    description: "Otro tatuaje de muestra para pruebas.",
    artistaId: 2,
  },
  {
    id: 3,
    name: "Tatuaje artístico",
    image: "https://rukminim2.flixcart.com/image/480/640/xif0q/tattoo/w/l/u/5-1-hb-22-temporary-tattoowala-10-original-imaghpqkxq8wjghw.jpeg?q=90",
    description: "Un tatuaje con un diseño artístico único.",
    artistaId: 1,
  },
];

export const list = () => tattoos;
export const getById = (id) => {
  const nid = Number(id);
  return tattoos.find((t) => Number(t.id) === nid);
};
export const create = (item) => {
  const nid = nextId(tattoos);
  const newItem = { id: typeof item.id !== 'undefined' ? item.id : nid, ...item };
  tattoos.push(newItem);
  return newItem;
};
export const update = (id, patch) => {
  const nid = Number(id);
  const idx = tattoos.findIndex((t) => Number(t.id) === nid);
  if (idx === -1) return null;
  tattoos[idx] = { ...tattoos[idx], ...patch };
  return tattoos[idx];
};
export const remove = (id) => {
  const nid = Number(id);
  const idx = tattoos.findIndex((t) => Number(t.id) === nid);
  if (idx === -1) return false;
  tattoos.splice(idx, 1);
  return true;
};
