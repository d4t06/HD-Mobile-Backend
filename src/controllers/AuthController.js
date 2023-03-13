const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// models
const User = require("../models/user");

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
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
            raw: true,
            include: [
               {
                  model: db.Role,
                  as: "role_data",
                  attributes: {
                     exclude: ["createdAt", "updatedAt"],
                  },
               },
            ],
         });

         if (!user) return res.sendStatus(401); // unauthorized
         const isCorrectPassword = await bcrypt.compare(password, user.password);

         if (isCorrectPassword) {
            const { id, username, role_code } = user;

            const token = jwt.sign(
               {
                  id,
                  username,
                  role_code,
               },
               "nguyenhuudat",
               {
                  expiresIn: "30s",
               }
            );

            const refreshToken = jwt.sign(
               {
                  id,
                  username,
                  role_code,
               },
               "nguyenhuudat",
               {
                  expiresIn: "1d",
               }
            );

            await db.User.update(
               { refresh_token: refreshToken },
               { where: { username: username } }
            );

            res.cookie("jwt", refreshToken, {
               httpOnly: true,
               maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({
               ...user,
               token: `bearer ${token}`,
            });
         } else {
            res.sendStatus(401);
         }
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }
   async handleRegister(req, res, next) {
      const { username, password, ...otherInfo } = req.body;

      if (!username || !password) {
         res.status(400).json("missing username or password");
         return;
      }

      //check for duplicate users in database
      const duplicate = await db.User.findOne({
         where: {
            username: username,
         },
      });

      if (duplicate) return res.status(409).json("username taken"); //conflict

      // service
      try {
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(password, salt);
         await db.User.create({
            password: hashPassword,
            username: username,
            ...otherInfo,
         });
         res.status(201).json("new user created");
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }
}

module.exports = new AuthController();
