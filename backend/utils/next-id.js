export default function nextId(list, idKey = 'id') {
  if (!Array.isArray(list) || list.length === 0) return 1;
  const max = Math.max(...list.map((it) => {
    const v = Number(it[idKey]);
    return Number.isNaN(v) ? 0 : v;
  }));
  return max + 1;
}
