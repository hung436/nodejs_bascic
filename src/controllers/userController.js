import userService from "../service/userService";
let register = async (req, res) => {
  let data = await userService.register(req);
  return res.status(200).json(data);
};
let login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let data = await userService.login(username, password);
  return res.status(200).json(data);
};
let getAddress = async (req, res) => {
  let data = await userService.getAddress(req.jwtDecoded);
  return res.status(200).json(data);
};
let order = async (req, res) => {
  let data = await userService.order(req);
  return res.status(200).json(data);
};
let getOrder = async (req, res) => {
  let data = await userService.getOrder(req.jwtDecoded, req.query.page);
  return res.status(200).json(data);
};
let getOrderDetail = async (req, res) => {
  let data = await userService.getOrderDetail(req.query.id);
  return res.status(200).json(data);
};
let refresh = async (req, res) => {
  let data = await userService.refresh(req);
  if (data.errorCode === 0) {
    return res.status(200).json(data.data);
  } else {
    return res.status(403).json(data.message);
  }
};
let addFavorite = async (req, res) => {
  let data = await userService.addFavorite(req.jwtDecoded, req.body.id);
  return res.status(200).json(data);
};
let getFavoriteProduct = async (req, res) => {
  let data = await userService.getFavoriteProduct(req.jwtDecoded, req.query.id);
  return res.status(200).json(data);
};
let deteleFavoriteProduct = async (req, res) => {
  let data = await userService.deteleFavoriteProduct(
    req.jwtDecoded,
    req.body.id
  );
  return res.status(200).json(data);
};
let changeAddress = async (req, res) => {
  let data = await userService.changeAddress(req.jwtDecoded, req.body.data);
  return res.status(200).json(data);
};
module.exports = {
  register,
  login,
  getAddress,
  order,
  getOrder,
  getOrderDetail,
  refresh,
  addFavorite,
  getFavoriteProduct,
  deteleFavoriteProduct,
  changeAddress,
};
