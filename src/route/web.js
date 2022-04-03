import express from "express";
import homeController from "./../controllers/homeController";
import apiController from "./../controllers/apiController";

let router = express.Router();
const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", (req, res) => {
    res.render("about");
  });
  // ////        here is api //////
  router.post("/api/loginadmin", apiController.loginadmin);
  router.get("/api/getuser", apiController.getuser);
  router.post("/api/createuser", apiController.createuser);

  return app.use("/", router);
};
module.exports = initWebRoute;
