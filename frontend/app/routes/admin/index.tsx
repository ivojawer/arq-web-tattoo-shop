import { NavLink, useNavigate } from "react-router";
import { Welcome } from "../../components/welcome/welcome";
import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin" },
    { name: "description", content: "Admin home" },
  ];
}

export default function Home() {
  const navigate = useNavigate()
  const goToCreateArtist = () => {
    navigate('/admin/create-artist');
  }
  const goToCreateTattoo = () => {
    navigate('/admin/create-tattoo');
  }
  return <div className="pt-16 p-4 container h-svh mx-auto">
    <h1 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h1>
    <div className="flex flex-col gap-4 items-center justify-center h-full" >
      <button onClick={goToCreateArtist} className="p-10 bg-blue-700 text-xl font-semibold text-white rounded-2xl w-full hover:shadow-2xl">Create Artist</button>
      <button onClick={goToCreateTattoo} className="p-10 bg-blue-700 text-xl font-semibold text-white rounded-2xl w-full hover:shadow-2xl">Create Tattoo</button>
    </div>
  </div>;
}
