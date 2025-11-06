import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { api } from "../api";
import { CarreteTattoos } from "../components/CarreteTattoos/carrete-tattoos";
import { EstiloTag } from "../components/estilos/estilo-tag";

type Artista = { id: number; name: string; bio?: string; estilos?: Array<{ id: number; name: string; tagColor: string }> };

export function meta() {
  return [
    { title: "Artista" },
    { name: "description", content: "Artista detail" },
  ];
}

export default function ArtistaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artista, setArtista] = useState<Artista | null>(null);

  useEffect(() => {
    if (!id) return;
    api
      .get<Artista>(`/artistas/${id}`)
      .then((res) => setArtista(res.data))
      .catch(() => setArtista(null));
  }, [id]);

  if (!id) return <div>Artista no especificado</div>;

  return (
    <main className="pt-16 p-4 container mx-auto">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 rounded bg-slate-700 text-white hover:bg-slate-600"
        >
          Volver
        </button>
      </div>
      {artista ? (
        <div>
          <section className="mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold">{artista.name}</h1>
              <div className="flex gap-2">
                {artista.estilos && artista.estilos.length ? (
                  artista.estilos.map((e) => (
                    <EstiloTag key={e.id} name={e.name} color={e.tagColor} />
                  ))
                ) : null}
              </div>
            </div>
            <p className="mt-2 text-base">{artista.bio}</p>
          </section>
          <CarreteTattoos artistaId={id} />
        </div>
      ) : (
        <p>Cargando artista...</p>
      )}
    </main>
  );
}
