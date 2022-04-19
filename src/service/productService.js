import db from "./../models/index";
const fs = require("fs");
const path = require("path");
let getProduct = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = page * 5;
      let product2 = await db.product.findAndCountAll({
        include: [{ model: db.category }],
        raw: true,
        nest: true,

        limit: 5,
        offset: offset,
      });
      if (product2) {
        resolve({
          errorCode: 0,
          message: "Success",
          data: product2,
        });
      } else {
        resolve({
          errorCode: 1,
          message: "Product not found",
          data: {},
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.product.findOne({
        where: { id: id },
        include: [{ model: db.category }],
        raw: false,
      });
      if (product) {
        resolve({ errorCode: 0, message: "Success", data: product });
      } else {
        resolve({ errorCode: 1, message: "Fail" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let createProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await db.product.findOne({ where: { name: data.body.name } });
      if (check) {
        let imgProduct = "src/public/uploads/" + data.file.filename;
        await fs.unlinkSync(imgProduct);
        resolve({
          errorCode: 1,
          message: "Đã tồn tại",
        });
      } else {
        await db.product.create({
          name: data.body.name,
          price: data.body.price,
          descrition: data.body.description,
          cate_id: data.body.category,
          discount: data.body.discount,
          image_link: data.file.filename,
          highlight: data.body.highlight,
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
let editProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.product.findOne({
        where: { id: data.body.id },
        raw: false,
      });
      if (product) {
        product.name = data.body.name;
        product.cate_id = data.body.category;
        product.price = data.body.price;
        product.descrition = data.body.description;
        product.discount = data.body.discount;
        product.highlight = data.body.highlight;
        if (data.file) {
          if (!product.image_link === null) {
            let oldProduct = "src/public/uploads/" + product.image_link;
            console.log(oldProduct);
            await fs.unlinkSync(oldProduct);
          }
          product.image_link = data.file.filename;
        }

        await product.save();
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
let deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.product.findOne({ where: { id: id }, raw: false });
      if (product) {
        if (!product.image_link === null) {
          let imgProduct = "src/public/uploads/" + product.image_link;
          await fs.unlinkSync(imgProduct);
        }
        await product.destroy();
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
module.exports = {
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  getProductById,
};
