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
      let isExist = await db.admin.findOne({ where: { username: username } });
      if (isExist) {
        let user = await db.admin.findOne({
          where: { username: username },
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
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = db.user.findAll({
          // attributes: {
          //   exclude: ["password"],
          // },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.user.findOne({
          where: { id: userId },
          // attributes: {
          //   exclude: ["password"],
          // },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserName(data.username);
      if (check) {
        resolve({
          errCode: 1,
          message: "username đã tồn tại",
        });
      } else {
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
      }
    } catch (error) {
      reject(error);
    }
  });
};
let update_User = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({ errCode: 2, message: "id not found" });
      }
      let user = await db.user.findOne({ where: { id: data.id }, raw: false });
      if (user) {
        let check = await checkUserName(data.username);
        if (check) {
          resolve({ errCode: 3, message: "Username đã tồn tại" });
        } else {
          let hash_password = await hashUserPassword(data.password);
          user.username = data.username;
          user.password = hash_password;
          user.firstname = data.firstname;
          user.lastname = data.lastname;
          user.address = data.address;
          user.email = data.email;
          user.numberphone = data.numberphone;
          await user.save();
          resolve({
            errCode: 0,
            message: "Update successful",
          });
        }
      } else {
        resolve({
          errCode: 1,
          message: "Update failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let delete_User = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.user.findOne({ where: { id: id }, raw: false });
      if (!data) {
        resolve({ errCode: 2, message: "User not found" });
      } else {
        await data.destroy();
        resolve({ errCode: 0, message: "User is deleted" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser,
  login,
  delete_User,
  getAllUsers,
  update_User,
};
