// In-memory repository for Tattoo
const tattoos = [
  {
    id: 1,
    name: "Tatuaje de ejemplo",
    image: "https://m.media-amazon.com/images/I/61wTUUXLnLL.jpg",
    description: "Un tatuaje de ejemplo para demostrar el repositorio en memoria.",
    artistaId: 1
  },
  {
    id: 2,
    name: "Tatuaje de muestra",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThh1EQ_5yiYTgcXPbNINVOObbOvXmfuq9uRQ&s",
    description: "Otro tatuaje de muestra para pruebas.",
    artistaId: 2
  }
];

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
