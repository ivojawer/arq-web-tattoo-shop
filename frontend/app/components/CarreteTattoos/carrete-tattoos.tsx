import { useEffect, useState } from "react";
import { api } from "../../api";
import { TarjetaTattoo } from "./tarjeta-tattoo";

export type Tattoo = {
    id: number,
    name: string,
    image: string,
    description: string,
    estilos: Array<{ id: number; name: string, tagColor: string}>,
    artista: { id: number; name: string}
}
export const CarreteTattoos = () => {
  const [tattoos, setTattoos] = useState<Array<Tattoo> | null>(null);
  useEffect(() => {
    api.get<Array<Tattoo>>('/tattoos').then(response => {
      setTattoos(response.data);
    })
  }, [setTattoos]);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-4">
        {tattoos ? tattoos.map((tattoo) => (
          <TarjetaTattoo key={tattoo.id} tattoo={tattoo} />
        )): <p>Cargando tattoos...</p>}
      </div>
    </div>
  );
}