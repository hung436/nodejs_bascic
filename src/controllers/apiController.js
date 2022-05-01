import apiService from "./../service/apiService";
import db from "./../models/index";
let getuser = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errorCode: 1,
      errMessage: "Missing required parameter 'id'",
      users: [],
    });
  }
  let users = await apiService.getAllUsers(id);
  return res.status(200).json({
    errorCode: 0,
    errMessage: "ok",
    users,
  });
  return res.status(200).json(data);
};

let loginadmin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let userData = await apiService.login(username, password);
  return res.status(200).json({
    errorCode: userData.error,
    message: userData.message,
    user: userData.user ? userData.user : {},
  });
};
let createuser = async (req, res) => {
  // let data = req.body;

  let mes = await apiService.createNewUser(req.body);

  return res.status(200).json(mes);
};
let updateUser = async (req, res) => {
  let resutl = await apiService.update_User(req.body);
  return res.status(200).json(resutl);
};
let deleteUser = async (req, res) => {
  let resutl = await apiService.delete_User(req.body.id);
  return res.status(200).json(resutl);
};
module.exports = { getuser, createuser, loginadmin, deleteUser, updateUser };
