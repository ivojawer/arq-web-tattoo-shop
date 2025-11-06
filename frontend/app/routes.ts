import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route('/artistas/:id', 'routes/artista-detail.tsx')] satisfies RouteConfig;
