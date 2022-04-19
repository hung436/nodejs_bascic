import db from "./../models/index";
let get_Category = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.category.findAll();
      if (data) {
        resolve({
          errorCode: 0,
          message: "Success",
          data: data,
        });
      } else {
        resolve({
          errorCode: 1,
          message: "Error",
          data: {},
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let addCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await db.category.findOne({ where: { name: data.name } });
      if (check) {
        resolve({
          errorCode: 1,
          message: "Đã tồn tại",
        });
      } else {
        await db.category.create({
          name: data.name,
        });
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
let editCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cate = await db.category.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (cate) {
        cate.name = data.name;
        await cate.save();
        resolve({
          errorCode: 0,
          message: "Success",
        });
      } else {
        resolve({ errorCode: 1, message: "Fail" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await db.category.findOne({
        where: { name: data.name },
        raw: false,
      });
      if (check) {
        await check.destroy();
        resolve({
          errorCode: 0,
          message: "Success",
        });
      } else {
        resolve({ errorCode: 1, message: "Cate not found" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { get_Category, deleteCategory, editCategory, addCategory };
