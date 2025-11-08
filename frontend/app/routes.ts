import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/artistas/:id", "routes/artista-detail.tsx"),
  route("admin", "routes/admin/index.tsx"),
  route("admin/create-artist", "routes/admin/create-artist.tsx"),
  route("admin/create-tattoo", "routes/admin/create-tattoo.tsx"),
] satisfies RouteConfig;
