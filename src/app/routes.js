import APIRoutes from "./routes/api/api.routes.js";

function MainRoutes(app) {
  // app.get("/", getIndex);
  // app.get("/dashboard", ensureAuth, getDashboard);

  // auth Routes
  // AuthRoutes(app);

  // Api main routes
  APIRoutes(app);
}

export default MainRoutes;
