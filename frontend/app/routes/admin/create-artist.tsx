import type { Route } from "../+types/artista-detail";
import CreateArtistForm from "../../components/admin/CreateArtistForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create Artist" },
    { name: "description", content: "Create a new artist" },
  ];
}

export default function CreateArtist() {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create Artist</h1>
      <CreateArtistForm />
    </main>
  );
}
