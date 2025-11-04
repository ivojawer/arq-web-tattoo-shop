export default function parseIds(input) {
  if (!input) return null;
  if (Array.isArray(input)) return input.map((s) => parseInt(s));
  return [parseInt(input)];
}
