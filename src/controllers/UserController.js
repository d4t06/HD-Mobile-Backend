const db = require("../models");
class UserController {
   async index(req, res, next) {
      //   res.json(req.userInfo);
      //   return;
      const userInfo = req.userInfo;
      try {
         const user = await db.User.findOne({ id: userInfo.id });
         res.json(user);
         //  console.log(user);
      } catch (error) {}
   }
}

module.exports = new UserController();
