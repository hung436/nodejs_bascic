import express from "express";
import homeController from "./../controllers/homeController";
import apiController from "./../controllers/apiController";
import cateController from "./../controllers/cateController";
import productController from "./../controllers/productController";
var multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "src/public/uploads/");
  },
  filename: function (req, file, callback) {
    console.log(file);
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: storage });
let router = express.Router();
const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", (req, res) => {
    res.render("about");
  });
  // ////        here is api //////
  ///USER
  router.post("/api/loginadmin", apiController.loginadmin);
  router.get("/api/getuser", apiController.getuser);
  router.post("/api/createuser", apiController.createuser);
  router.put("/api/updateuser", apiController.updateUser);
  router.delete("/api/deleteuser", apiController.deleteUser);
  ///Category
  router.get("/api/getcategory", cateController.getCategory);
  router.post("/api/createcategory", cateController.createCategory);
  router.put("/api/editcategory", cateController.editCategory);
  router.delete("/api/deletecategory", cateController.deleteCategory);
  ////Product
  router.get("/api/getproduct", productController.getProduct);
  router.get("/api/getproductbyid", productController.getProductById);
  router.post(
    "/api/createproduct",
    upload.single("images"),
    productController.createProduct
  );
  router.put(
    "/api/editproduct",
    upload.single("images"),
    productController.editProduct
  );
  router.delete("/api/deleteproduct", productController.deleteProduct);
  return app.use("/", router);
};
module.exports = initWebRoute;
