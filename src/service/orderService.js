import db from "./../models/index";
const getAllOrder = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = page * 5;
      let data = await db.cart.findAndCountAll({
        // include: [{ model: db.category }],
        raw: true,
        nest: true,

        limit: 5,
        offset: offset,
      });
      resolve({
        errorCode: 0,
        message: "Success",
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { getAllOrder };
