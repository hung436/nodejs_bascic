import orderService from "./../service/orderService";
const getAllOrder = async (req, res) => {
  let data = await orderService.getAllOrder(req.query.page);
  return res.status(200).json(data);
};
const changeOrder = async (req, res) => {
  let data = await orderService.changeOrder(req.body.id, req.body.status);
  return res.status(200).json(data);
};
module.exports = { getAllOrder, changeOrder };
