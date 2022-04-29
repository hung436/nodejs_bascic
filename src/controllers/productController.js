import productService from "../service/productService";
let getProduct = async (req, res) => {
  let page = req.query.page;
  let data = await productService.getProduct(page);
  return res.status(200).json(data);
};
let getProductById = async (req, res) => {
  let id = req.query.id;
  let data = await productService.getProductById(id);
  return res.status(200).json(data);
};
let createProduct = async (req, res) => {
  let data = await productService.createProduct(req);
  return res.status(200).json(data);
};
let editProduct = async (req, res) => {
  let data = await productService.editProduct(req);
  return res.status(200).json(data);
};
let deleteProduct = async (req, res) => {
  let data = await productService.deleteProduct(req.body.id);
  return res.status(200).json(data);
};
let getProductFill = async (req, res) => {
  let data = await productService.getProductFill(
    req.query.id,
    req.query.action
  );
  return res.status(200).json(data);
};
module.exports = {
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  getProductById,
  getProductFill,
};
