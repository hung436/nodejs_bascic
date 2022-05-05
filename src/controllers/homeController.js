import homeService from "./../service/homeService";
let getHomePage = async (req, res) => {
  // let data = await homeService.getUsers();

  return res.send("Hello world");
};

module.exports = {
  getHomePage,
};
