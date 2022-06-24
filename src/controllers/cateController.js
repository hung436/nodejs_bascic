import cateService from './../service/cateService';

let getCategory = async (req, res) => {
  let data = await cateService.get_Category(req.query);
  return res.status(200).json(data);
};
let createCategory = async (req, res) => {
  let data = await cateService.addCategory(req.body);
  return res.status(200).json(data);
};
let editCategory = async (req, res) => {
  let data = await cateService.editCategory(req.body);
  console.log(req.body);
  return res.status(200).json(data);
};
let deleteCategory = async (req, res) => {
  let data = await cateService.deleteCategory(req.body);
  return res.status(200).json(data);
};
module.exports = {
  getCategory,
  createCategory,
  editCategory,
  deleteCategory,
};
