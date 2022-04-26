import userService from "../service/userService";
let register = async (req, res) => {
  let data = await userService.register(req);
  return res.status(200).json(data);
};
let login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log(req.body);
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
  let data = await userService.getOrder(req.jwtDecoded);
  return res.status(200).json(data);
};
let getOrderDetail = async (req, res) => {
  let data = await userService.getOrderDetail(req.query.id);
  return res.status(200).json(data);
};
let refresh = async (req, res) => {
  console.log("refresh", req.body.refreshToken);
  let data = await userService.refresh(req);
  if (data.errorCode === 0) {
    return res.status(200).json(data.data);
  } else {
    return res.status(403).json(data.message);
  }
};
module.exports = {
  register,
  login,
  getAddress,
  order,
  getOrder,
  getOrderDetail,
  refresh,
};
