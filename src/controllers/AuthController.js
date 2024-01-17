const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
   async handleLogin(req, res) {
      const { username, password } = req.body;

      // check payload
      if (!username || !password) {
         res.status(400).json("missing username or password");
         return;
      }

      // service
      try {
         const user = await db.User.findOne({
            where: {
               username: username,
            },

            // raw: true, => then res = 'role_data.id' not role_data: {id: }
         });

         if (!user) return res.sendStatus(401); // unauthorized
         const isCorrectPassword = await bcrypt.compare(password, user.password);

         if (isCorrectPassword) {
            const token = jwt.sign(
               {
                  username,
                  role: user.role ?? "",
               },
               process.env.JWT_SECRET,
               {
                  expiresIn: "1d",
               }
            );

            const refreshToken = jwt.sign(
               {
                  username,
                  role: user.role ?? "",
               },
               process.env.JWT_SECRET,
               {
                  expiresIn: "1d",
               }
            );

            await db.User.update({ refresh_token: refreshToken }, { where: { username: username } });

            res.cookie("jwt", refreshToken, {
               httpOnly: true,
               maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({
               role: user.role ?? "",
               token,
            });
         } else {
            res.sendStatus(401);
         }
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }
   async handleRegister(req, res, next) {
      const { username, password, role } = req.body;

      if (!username || !password) {
         res.status(400).json("missing username or password");
         return;
      }

      const duplicate = await db.User.findOne({
         where: {
            username: username,
         },
      });

      if (duplicate) return res.status(409).json("username taken"); //conflict

      try {
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(password, salt);
         await db.User.create({
            password: hashPassword,
            username,
            role,
         });
         res.status(201).json("new user created");
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }
}

module.exports = new AuthController();
