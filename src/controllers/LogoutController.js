const db = require("../models/index");
// const jwt = require("jsonwebtoken");

const handleLogout = async (req, res) => {
   const cookies = req.cookies;
   if (!cookies?.jwt) return res.sendStatus(204); //no content
   const refreshToken = cookies.jwt;

   // is refresh token in db
   const user = await db.User.findOne({
      where: { refresh_token: refreshToken },
   });

   if (!user) {
      res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.sendStatus(204);
   }

   await db.User.update(
      { refresh_token: null },
      { where: { username: user.username } }
   );
   res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
   return res.sendStatus(204);
};

module.exports = { handleLogout };
