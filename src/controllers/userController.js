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
  console.log(req.body);
  let data = await userService.order(req);
  return res.status(200).json(data);
};
module.exports = { register, login, getAddress, order };
