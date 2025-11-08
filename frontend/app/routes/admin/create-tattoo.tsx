import type { Route } from "../+types/home";
import CreateTattooForm from "../../components/admin/CreateTattooForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create Tattoo" },
    { name: "description", content: "Create a new tattoo" },
  ];
}

export default function CreateTattoo() {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create Tattoo</h1>
      <CreateTattooForm />
    </main>
  );
}
