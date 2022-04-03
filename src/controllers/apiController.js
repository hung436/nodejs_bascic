import apiService from "./../service/apiService";
import db from "./../models/index";
let getuser = async (req, res) => {
  let data = await db.user.findAll();
  return res.status(200).json(data);
};

let loginadmin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log(req.body);
  let userData = await apiService.login(username, password);
  return res.status(200).json({
    errorCode: userData.error,
    message: userData.message,
    user: userData.user ? userData.user : {},
  });
};
let createuser = async (req, res) => {
  // let data = req.body;
  console.log(req.body);
  let mes = await apiService.createNewUser(req.body);

  return res.status(200).json(mes);
};
module.exports = { getuser, createuser, loginadmin };
