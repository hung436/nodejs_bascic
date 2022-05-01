const jwtHelper = require("../helpers/jwt.helper");
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example";
let isAuth = async (req, res, next) => {
  // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
  const tokenFromClient = req.headers.authorization;

  if (tokenFromClient) {
    // Nếu tồn tại token

    const token = tokenFromClient && tokenFromClient.split(" ")[1];

    try {
      const decoded = await jwtHelper.verifyToken(token, accessTokenSecret);

      // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
      req.jwtDecoded = decoded.data._id;

      // Cho phép req đi tiếp sang controller.
      next();
    } catch (error) {
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};
let isAdmin = async (req, res, next) => {
  isAuth(req, res, () => {
    if (req.uer.id == req.parmas.id || req.user.admin) {
      next();
    } else {
      res.status(403).json("no admin");
    }
  });
};
module.exports = {
  isAuth: isAuth,
  isAdmin: isAdmin,
};
