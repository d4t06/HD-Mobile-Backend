const db = require("../models");
class UserController {
   async index(req, res, next) {
      try {
         const user = await db.User.findAll({
            // where: { id: userInfo.id },
            attributes: {
               exclude: ["password"],
            },
         });
         res.json(user);
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }
}

module.exports = new UserController();
