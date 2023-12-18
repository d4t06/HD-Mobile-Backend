const db = require("../models");
const data = require("../controllers/testData.json");

class InsertController {
   async index(req, res, next) {
      try {
         // res.json(data)
         await db.Product.bulkCreate(data);
         res.json("insert successfully");
      } catch (error) {
         res.json("co loi");
         console.log(error);
      }
   }
}

module.exports = new InsertController();
