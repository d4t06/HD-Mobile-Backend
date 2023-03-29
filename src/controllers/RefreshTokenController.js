const db = require("../models/index");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
   const cookies = req.cookies;

   if (!cookies?.jwt) return res.sendStatus(401); //unauthorized

   const refreshToken = cookies.jwt;

   const user = await db.User.findOne({
      where: { refresh_token: refreshToken },
   });

   if (!user) return res.sendStatus(403); //forbidden

   jwt.verify(refreshToken, "nguyenhuudat", (err, decode) => {
      if (err || user.username !== decode.username) return res.sendStatus(403);

      const role_code = decode.role_code
      const token = jwt.sign(
         {
            username: decode.username,
            role_code: role_code,
         },
         "nguyenhuudat",
         {
            expiresIn: "10s",
         }
      );

      res.json({token, role_code});
   });
};

module.exports = { handleRefreshToken };
