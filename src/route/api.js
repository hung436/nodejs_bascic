import express from "express";
let router = express.Router();
const initWebRoute = (app) => {
  app.get("/", (req, res) => {
    res.render("home");
  });
};
module.exports = initWebRoute;
