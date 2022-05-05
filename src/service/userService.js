import db from "./../models/index";
import bcrypt from "bcrypt";
const jwtHelper = require("../helpers/jwt.helper");
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
let tokenList = {};
// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "10m";
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example";
// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "hungdt";

let login = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await db.user.findOne({ where: { username: username } });
      if (isExist) {
        let user = await db.user.findOne({
          where: { username: username },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            const userFakeData = {
              _id: user.id,
              name: user.firstname,
              username: username,
            };
            const accessToken = await jwtHelper.generateToken(
              userFakeData,
              accessTokenSecret,
              accessTokenLife
            );
            const refreshToken = await jwtHelper.generateToken(
              userFakeData,
              refreshTokenSecret,
              refreshTokenLife
            );
            tokenList[refreshToken] = { accessToken, refreshToken };
            userData.refreshToken = refreshToken;
            userData.accessToken = accessToken;
            userData.error = 0;
            userData.message = "Đăng nhập thành công";
            delete user.password;
            userData.username = user.username;
            userData.userID = user.id;
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
let getAddress = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let address = await db.user.findOne({
        where: { id: id },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
        include: [{ model: db.address }],
        raw: true,
        nest: true,
      });
      resolve(address);
    } catch (error) {
      reject(error);
    }
  });
};
let order = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data.jwtDecoded) {
        let idorder = null;
        let address = await db.address.findOne({
          where: { id: data.body.address_id },
        });

        await db.order
          .create({
            userId: data.jwtDecoded,
            payment_method: data.body.payment_method,
            price: data.body.total,
            status: data.body.status,
            address:
              address.city +
              " " +
              address.district +
              " " +
              address.ward +
              " " +
              address.street_name,
          })
          .then((order) => {
            idorder = order.id;
            let array = [];
            data.body.products.map((item) => {
              let instan = {
                orderID: order.id,
                quality: item.quantity,
                price: item.price,
                producID: item.id,
              };
              array.push(instan);
            }),
              db.orderdetail.bulkCreate(array);
          });
        resolve({ errorCode: 0, message: "Success", id: idorder });
      } else {
        resolve({ errorCode: 1, message: "not found" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let refresh = async (req) => {
  return new Promise(async (resolve, reject) => {
    const refreshTokenFromClient = req.body.refreshToken;
    // debug("tokenList: ", tokenList);

    // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
    if (refreshTokenFromClient) {
      try {
        // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded
        const decoded = await jwtHelper.verifyToken(
          refreshTokenFromClient,
          refreshTokenSecret
        );
        // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
        // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
        // debug("decoded: ", decoded);
        const userFakeData = decoded.data;

        const accessToken = await jwtHelper.generateToken(
          userFakeData,
          accessTokenSecret,
          accessTokenLife
        );

        // gửi token mới về cho người dùng
        resolve({
          errorCode: 0,
          message: "Success",
          data: accessToken,
        });
      } catch (error) {
        reject(error);
        resolve({
          errorCode: 1,
          message: "Invalid refresh token.",
        });
      }
    } else {
      resolve({
        errorCode: 1,
        message: "No token provided.",
      });
    }
  });
};

let getOrder = (id, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = page * 5;
      let data = await db.order.findAndCountAll({
        where: { userId: id },
        // include: [{ model: db.address }],
        raw: true,
        nest: true,
        limit: 5,
        offset: offset,
      });
      if (data) {
        resolve({
          errorCode: 0,
          message: "Success",
          data: data,
        });
      } else {
        resolve({
          errorCode: 1,
          message: "not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getOrderDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        let data = await db.orderdetail.findAll({
          order: [["id", "ASC"]],
          where: { orderID: id },
          include: [{ model: db.product }],
          raw: true,
          nest: true,
        });
        resolve({
          errorCode: 0,
          message: "Success",
          data: data,
        });
      } else {
        resolve({
          errorCode: 1,
          message: "not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let addFavorite = (id, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.favorite.create({
        userId: id,
        productId: productId,
      });
      resolve({
        errorCode: 0,
        message: "Success",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getFavoriteProduct = (id, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await db.favorite.findOne({
        where: { userId: id, productId: productId },
      });
      if (check) {
        resolve({
          errorCode: 0,
          message: "Yes",
        });
      } else {
        resolve({ errorCode: 1, message: "Fail" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deteleFavoriteProduct = (id, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.favorite.findOne({
        where: { userId: id, productId: productId },
        raw: false,
      });
      if (product) {
        await product.destroy();
        resolve({
          errorCode: 0,
          message: "Success",
        });
      } else {
        resolve({ errorCode: 1, message: "not found" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let changeAddress = (id, address) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userAddress = await db.address.findOne({
        where: { userID: id },
        raw: false,
      });
      if (userAddress) {
        userAddress.city = address.city;
        userAddress.district = address.district;
        userAddress.ward = address.ward;
        userAddress.street_name = address.street_name;
        userAddress.save();
        resolve({
          errorCode: 0,
          message: "Success",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
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
