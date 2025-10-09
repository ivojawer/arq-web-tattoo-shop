export default function createUsuarioService(context) {
  const repo = context.repos.usuario;
  const list = () => repo.list();
  const getById = (id) => repo.getById(id);
  const create = (data) => {
    const id = Date.now().toString();
    const user = { id, ...data };
    return repo.create(user);
  };
  const update = (id, patch) => repo.update(id, patch);
  const remove = (id) => repo.remove(id);
  return { list, getById, create, update, remove };
}
