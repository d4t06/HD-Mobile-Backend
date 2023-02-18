const db = require("../models");
const data = require("../../product_demand.json");

class InsertController {
   async index(req, res, next) {
      try {
         // res.json(data)
         await db.Product_demand.bulkCreate(data);
         res.json("insert successfully");
      } catch (error) {
         res.json("co loi");
         console.log(error);
      }
   }
}

module.exports = new InsertController();
