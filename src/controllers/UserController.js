const db = require("../models");
class UserController {
   async index(req, res, next) {
      try {
         const user = await db.User.findAll({
            // where: { id: userInfo.id },
            attributes: {
               exclude: ["password", "role_code"],
            },
            // include: [
            //    {
            //       model: db.Role,
            //       as: "role_data",
            //       attributes: {
            //          exclude: ["createdAt", "updatedAt"],
            //       },
            //    },
            // ],
         });
         res.json(user);
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }
}

module.exports = new UserController();
