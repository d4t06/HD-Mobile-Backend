const db = require("../models/index");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
   const cookies = req.cookies;

   if (!cookies?.jwt) return res.sendStatus(401); //unauthorized

   const refreshToken = cookies.jwt;

   const user = await db.User.findOne({
      where: { refresh_token: refreshToken },
   });

   // console.log("check user", user);

   if (!user) return res.sendStatus(403); //forbidden

   jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decode) => {
      if (err || user.username !== decode.username) return res.sendStatus(403);

      const { username, role } = decode;

      const newToken = jwt.sign(
         {
            username,
            role,
         },
         process.env.JWT_SECRET,
         {
            expiresIn: "1d",
         }
      );

      res.json({ token: newToken, role });
   });
};

module.exports = { handleRefreshToken };
