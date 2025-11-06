import { Welcome } from "../components/welcome/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Welcome" },
    { name: "description", content: "Welcome to your Tattoo Shop!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
