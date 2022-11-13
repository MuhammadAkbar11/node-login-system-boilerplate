import { API_VERSION } from "../../../constants/version.constants.js";
import {
  getDummyHandler,
  postDummyHandler,
} from "../../controllers/api/dumb.controller.js";

function APIRoutes(app) {
  app.route(`${API_VERSION}`).get((req, res) => {
    res.send({ message: "Hello" });
  });

  app
    .route(`${API_VERSION}/dummies`)
    .get(getDummyHandler)
    .post(postDummyHandler);
}

export default APIRoutes;
