import db from "./../models/index";
const getAllOrder = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = page * 5;
      let data = await db.order.findAndCountAll({
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
const changeOrder = (id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.order.findOne({ where: { id: id }, raw: false });
      if (order) {
        order.status = status;
        await order.save();
        resolve({
          errorCode: 0,
          message:
            status === 2
              ? "Xác nhận đơn hàng thành công"
              : "Xác nhận đã giao hàng",
        });
      } else {
        errorCode = 1;
        message = "not found";
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { getAllOrder, changeOrder };
