const models = require("../models");

function errorRes(res, msg) {
   return res.status(402).json({ status: "error", message: msg || "missing payload" });
}

class AppController {
   async getAllCategory(req, res) {
      try {
         const categories = await models.Category.findAll({
            where: { hidden: 0 },
         });
         res.json(categories);
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error.message });
      }
   }

   async getAllBrand(req, res) {
      try {
         const { category_id } = req.query;

         if (!category_id) return errorRes(res);

         const brands = await models.Brand.findAll({ where: { category_id } });
         res.json(brands);
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }

   async getCategoryAttributes(req, res) {
      try {
         const { category_id } = req.query;
         if (category_id === undefined) return errorRes(res);

         const data = await models.Category_Attribute.findAll({ where: { category_id } });

         res.status(200).json(data);
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "fail", message: error });
      }
   }

   async getCategoryPrices(req, res) {
      try {
         const { category_id } = req.query;
         if (category_id === undefined) return errorRes(res);

         const data = await models.PriceRange.findAll({
            where: { category_id },
            order: [["from", "ASC"]],
         });

         res.status(200).json(data);
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "error", message: error });
      }
   }
}

module.exports = new AppController();
