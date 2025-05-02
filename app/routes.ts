import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./routes/notice.tsx"),
    // route("notice", "./routes/notice.tsx"),
    route("login", "./pages/LoginPage.tsx"),
    route("dashboard", "./pages/Dashboard.tsx")
] satisfies RouteConfig;
