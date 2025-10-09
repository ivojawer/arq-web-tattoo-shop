import * as repo from "./artistaFavorito.memory.repo.js";

export const list = () => repo.list();
export const getById = (id) => repo.getById(id);
export const create = (data) => {
  const id = Date.now().toString();
  const item = { id, ...data };
  return repo.create(item);
};
export const update = (id, patch) => repo.update(id, patch);
export const remove = (id) => repo.remove(id);
