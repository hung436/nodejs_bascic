import db from "./../models/index";
import bcrypt from "bcrypt";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await bcrypt.hashSync(password, salt);

      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};
let checkUserName = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.user.findOne({ where: { username: username } });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let login = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserName(username);
      if (isExist) {
        let user = await db.user.findOne({
          where: { username: username },
          attributes: ["username", "password"],
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.error = 0;
            userData.message = "Đăng nhập thành công";
            delete user.password;
            userData.user = user;
          } else {
            userData.error = 3;
            userData.message = "Wrong password";
          }
        } else {
          userData.error = 2;
          userData.message = "User not found";
        }
      } else {
        userData.error = 1;
        userData.message =
          "Your Email isn't exist in your system. Please try other email!";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash_password = await hashUserPassword(data.password);
      await db.user.create({
        username: data.username,
        password: hash_password,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        address: data.address,
        numberphone: data.numberphone,
        // gender: data.gender === "1" ? true : false,
        // image: data.image,
        // roleId: data.roleId,
        // positionId: data.positionId,
      });
      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { createNewUser, login };
