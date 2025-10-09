export default function createEstiloService(context) {
  const repo = context.repos.estilo;
  const list = () => repo.list();
  const getById = (id) => repo.getById(id);
  const create = (data) => {
    const id = Date.now().toString();
    const item = { id, ...data };
    return repo.create(item);
  };
  const update = (id, patch) => repo.update(id, patch);
  const remove = (id) => repo.remove(id);
  return { list, getById, create, update, remove };
}
