import * as repo from "./usuario.memory.repo.js";

export const list = () => repo.list();
export const getById = (id) => repo.getById(id);
export const create = (data) => {
  const id = Date.now().toString();
  const user = { id, ...data };
  return repo.create(user);
};
export const update = (id, patch) => repo.update(id, patch);
export const remove = (id) => repo.remove(id);
