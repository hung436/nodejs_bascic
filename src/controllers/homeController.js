import homeService from "./../service/homeService";
let getHomePage = async (req, res) => {
  let data = await homeService.getUsers();
  console.log(data);
  return res.render("home", { data: data });
};

module.exports = {
  getHomePage,
};
