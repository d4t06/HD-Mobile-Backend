const db = require("../models");
class UserController {
   async index(req, res, next) {
      //   res.json(req.userInfo);
      //   return;
      const userInfo = req.userInfo;
      try {
         const user = await db.User.findOne({
            where: { id: userInfo.id },
            attributes: {
               exclude: ["password", "role_code"],
            },
            include: [
               {
                  model: db.Role,
                  as: "roleData",
                  attributes: {
                     exclude: ["createdAt", "updatedAt"],
                  },
               },
            ],
         });
         res.json(user);
         //  console.log(user);
      } catch (error) {}
   }
}

module.exports = new UserController();
