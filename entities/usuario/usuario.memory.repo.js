// In-memory repository for Usuario
const usuarios = [];

export const list = () => usuarios;
export const getById = (id) => usuarios.find((u) => u.id === id);
export const create = (user) => {
  usuarios.push(user);
  return user;
};
export const update = (id, patch) => {
  const idx = usuarios.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  usuarios[idx] = { ...usuarios[idx], ...patch };
  return usuarios[idx];
};
export const remove = (id) => {
  const idx = usuarios.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  usuarios.splice(idx, 1);
  return true;
};
