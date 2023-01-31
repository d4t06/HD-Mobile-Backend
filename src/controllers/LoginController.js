const bcrypt = require("bcrypt");
const db = require("../models");
const user = require("../models/user");
// models
const User = require("../models/user");

class NewsController {
   async handleLogin(req, res) {
      const { username, password } = req.body;
      // service
      try {
         const user = await db.User.findOne({ where: { username: username } });

         if (user) {
            const isCorrectPassword = await bcrypt.compare(
               password,
               user.password
            );
            if (isCorrectPassword) {
               // handle login
               res.json("dang nhap thanh cong");
            } else {
               res.json("tai khoan hoac mat khau khong dung");
            }
         } else {
            res.json("tai khoan hoac mat khau khong dung");
         }
      } catch (error) {
         console.log(error);
         res.status(500).json("loi server");
      }
   }
   async handleRegister(req, res, next) {
      const { username, password, ...otherInfo } = req.body;

      // res.json({ username, password, ...otherInfo });
      // return;
      try {
         const process = await db.User.findOne({
            where: { username: username },
         });
         const isCreated = await process;
         req.isCreated = isCreated;
      } catch (error) {
         console.log(error);
         res.json("co loi");
      }

      // res.json(req.isCreated);
      // return;

      // service
      if (!req.isCreated) {
         try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            // res.json(hashPassword);
            // return;
            const process = await db.User.create({
               password: hashPassword,
               username: username,
               ...otherInfo.parse(),
            });
            if (process) {
               res.json("dang ky thanh cong");
            } else res.json("loi khi dang dang ky");
         } catch (error) {
            console.log(error);
            res.status(500).json("lỗi khi gen hash hoac dang ky");
         }
      } else res.json("tai khoan da ton tai");
   }
}

module.exports = new NewsController();
