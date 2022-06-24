import express from 'express';
import homeController from './../controllers/homeController';
import apiController from './../controllers/apiController';
import cateController from './../controllers/cateController';
import productController from './../controllers/productController';
import userController from './../controllers/userController';
import orderController from './../controllers/orderController';
import { isAuth } from './../middleware/AuthMiddleware';

var multer = require('multer');
const path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'src/public/uploads/');
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: storage });
let router = express.Router();
const initWebRoute = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/about', (req, res) => {
    res.render('about');
  });
  // ////        here is api //////
  ///Admin
  router.post('/api/loginadmin', apiController.loginadmin);
  router.get('/api/getuser', apiController.getuser);
  router.post('/api/createuser', apiController.createuser);
  router.put('/api/updateuser', apiController.updateUser);
  router.delete('/api/deleteuser', apiController.deleteUser);
  ///Category
  router.get('/api/getcategory', cateController.getCategory);
  router.post('/api/createcategory', cateController.createCategory);
  router.put('/api/editcategory', cateController.editCategory);
  router.delete('/api/deletecategory', cateController.deleteCategory);
  ////Product
  router.get('/api/getproduct', productController.getProduct);
  router.get('/api/getproductfill', productController.getProductFill);
  router.get('/api/getproductbyid', productController.getProductById);
  router.post(
    '/api/createproduct',
    upload.single('images'),
    productController.createProduct
  );
  router.put(
    '/api/editproduct',
    upload.single('images'),
    productController.editProduct
  );
  router.delete('/api/deleteproduct', productController.deleteProduct);
  router.get('/api/searchproduct', productController.searchProduct);
  ////User
  router.post('/api/registeruser', userController.register);
  router.post('/api/loginuser', userController.login);
  router.post('/api/refresh', userController.refresh);
  router.get('/api/getaddress', isAuth, userController.getAddress);
  router.put('/api/changeaddress', isAuth, userController.changeAddress);
  router.post('/api/order', isAuth, userController.order);
  router.get('/api/getorder', isAuth, userController.getOrder);
  router.get('/api/getorderdetail', isAuth, userController.getOrderDetail);
  ////favorite
  router.post('/api/addfavorite', isAuth, userController.addFavorite);
  router.get(
    '/api/getfavoriteproduct',
    isAuth,
    userController.getFavoriteProduct
  );
  router.delete(
    '/api/detelefavoriteproduct',
    isAuth,
    userController.deteleFavoriteProduct
  );

  ////order
  router.get('/api/getallorder', orderController.getAllOrder);
  router.put('/api/changeorder', orderController.changeOrder);

  return app.use('/', router);
};
module.exports = initWebRoute;
