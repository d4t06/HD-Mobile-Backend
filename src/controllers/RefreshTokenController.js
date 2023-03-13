const db = require("../models/index");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
   const cookies = req.cookies;

   if (!cookies?.jwt) return res.sendStatus(401); //unauthorized

   const refreshToken = cookies.jwt;

   const user = await db.User.findOne({ where: { refresh_token: refreshToken } });
   console.log(user);

   if (!user) return res.sendStatus(403); //forbidden

   jwt.verify(refreshToken, "nguyenhuudat", (err, decode) => {
      if (err || user.username !== decode.username) return res.sendStatus(403);

      const accessToken = jwt.sign(
         {
            id: decode.id,
            username: decode.username,
            role_code: decode.role_code,
         },
         "nguyenhuudat",
         {
            expiresIn: "30s",
         }
      );

      res.json({ accessToken });
   });
};

module.exports = { handleRefreshToken };
