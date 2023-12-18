const models = require("../models");
class AppController {
   async getAllCategory(req, res, next) {
      try {
         const categories = await models.Category.findAll({});
         res.json(categories);
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }
   async getAllBrand(req, res, next) {
      try {
         const brands = await models.Brand.findAll({});
         res.json(brands);
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }
}

module.exports = new AppController();
