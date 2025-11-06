export const EstiloTag = ({ name, color}: { name: string; color: string }) => {
  return (
    <div style={{ backgroundColor: color, padding: '5px 10px', borderRadius: '5px', color: '#fff', display: 'inline-block' }}>
      {name}
    </div>
  );
}