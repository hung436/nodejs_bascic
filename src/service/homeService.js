import db from "./../models/index";

let getUsers = () => {
  let data = db.user.findAll();
  return data;
};
module.exports = { getUsers };
