const db = require("../models");
const data = require("../../data.json");

class InsertController {
   async index(req, res, next) {
      try {
         await db.Product.bulkCreate(data);
         res.json("insert successfully");
      } catch (error) {
         res.json("co loi");
         console.log(error);
      }
   }
}

module.exports = new InsertController();
