const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
   console.log("token middleware passed");
   const token = req.headers.authorization.split(" ")[1];
   //    console.log(token);
   try {
      const userInfo = jwt.verify(token, "nguyenhuudat");
      if (userInfo) {
         req.userInfo = userInfo;
         next();
      }
   } catch (error) {
      res.status(500).json("token invalid or expired");
   }
};
