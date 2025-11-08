import { NavLink } from "react-router";
import { EstiloTag } from "../estilos/estilo-tag";
import type { Tattoo } from "./carrete-tattoos";
import { api } from "../../api";

export const TarjetaTattoo = ({ tattoo }: { tattoo: Tattoo }) => {
  const deleteTattoo = () => {
    api.delete('/tattoos/' + tattoo.id).then(() => {
      window.location.reload();
    });
  }
  return (
    <div className="flex flex-col items-center rounded p-2 gap-2 shadow" style={{backgroundColor: '#131b24'}}>
      <div className="flex">
        <h3 className="text-lg font-semibold">{tattoo.name}</h3>
        <button onClick={deleteTattoo}>
          <img className="h-5"src="trash.svg"></img>
        </button>
      </div>
      <img className="h-[400px]" src={tattoo.image} alt={tattoo.name} />
      <p className="text-sm">{tattoo.description}</p>
      <div className="flex gap-1.5">
        {tattoo.estilos.map(estilo => (
          <EstiloTag key={estilo.id} name={estilo.name} color={estilo.tagColor} />
        ))}
      </div>
        <NavLink to={'artistas/' + tattoo.artista.id} className="text-sm hover:underline">{tattoo.artista.name}</NavLink>
    </div>
  );
}