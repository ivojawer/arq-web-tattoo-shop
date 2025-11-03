import { useEffect, useState } from "react";
import { api } from "../../api";

export type Tattoo = {
    id: number,
    name: string,
    image: string,
    description: string,
    estilos: Array<{ id: number; name: string }>,
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
    <div>
      <h2>Carrete de Tattoos</h2>
      <div>
        {tattoos ? tattoos.map((tattoo) => (
          <div key={tattoo.id} >
            <h3>{tattoo.name}</h3>
            <img src={tattoo.image} alt={tattoo.name} />
            <p>{tattoo.description}</p>
            <p>Artista: {tattoo.artista.name}</p>
            <p>Estilos: {tattoo.estilos.map(e => e.name).join(', ')}</p>
          </div>
        )): <p>Cargando tattoos...</p>}
      </div>
    </div>
  );
}