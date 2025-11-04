import { useEffect, useState } from "react";
import { api } from "../../api";
import { TarjetaTattoo } from "./tarjeta-tattoo";

export type Tattoo = {
  id: number,
  name: string,
  image: string,
  description: string,
  estilos: Array<{ id: number; name: string, tagColor: string }>,
  artista: { id: number; name: string }
}

export type Estilo = { id: number; name: string; tagColor: string };

export const CarreteTattoos = () => {
  const [tattoos, setTattoos] = useState<Array<Tattoo> | null>(null);
  const [estilos, setEstilos] = useState<Array<Estilo>>([]);
  const [selectedEstilos, setSelectedEstilos] = useState<Array<string>>([]);

  useEffect(() => {
    api.get<Array<Estilo>>('/estilos').then(res => setEstilos(res.data));
  }, []);

  useEffect(() => {
    const params: any = {};
    if (selectedEstilos && selectedEstilos.length) params.estilosIds = selectedEstilos;
    setTattoos(null);
    api.get<Array<Tattoo>>('/tattoos', { params }).then(response => {
      setTattoos(response.data);
    });
  }, [selectedEstilos]);

  const toggleEstilo = (id: number) => {
    const sid = String(id);
    setSelectedEstilos((prev) => prev.includes(sid) ? prev.filter((x) => x !== sid) : [...prev, sid]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <div className="flex gap-2 flex-wrap">
          {estilos.map((e) => (
            <label key={e.id} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedEstilos.includes(String(e.id))}
                onChange={() => toggleEstilo(e.id)}
              />
              <span style={{ backgroundColor: e.tagColor }} className="px-2 py-1 rounded text-white">{e.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-4">
          {tattoos ? tattoos.map((tattoo) => (
            <TarjetaTattoo key={tattoo.id} tattoo={tattoo} />
          )) : <p>Cargando tattoos...</p>}
        </div>
      </div>
    </div>
  );
}