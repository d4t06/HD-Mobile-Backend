const models = require("../models");

function errorRes(res, msg) {
   return res.status(402).json({ status: "error", message: msg || "missing payload" });
}

class AppController {
   async getAllCategory(req, res, next) {
      try {
         const categories = await models.Category.findAll({
            where: { hidden: 0 },
            // include: [
            //    {
            //       model: models.Category_Attribute,
            //       as: "attributes",
            //    },
            //    {
            //       model: models.PriceRange,
            //       as: "price_ranges",
            //    },
            // ],
         });
         res.json(categories);
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error.message });
      }
   }

   async getAllBrand(req, res, next) {
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
         const { id } = req.params;
         if (id === undefined) return errorRes(res);

         const data = await models.Category_Attribute.findAll({ where: { category_id: id } });

         res.status(200).json({
            status: "successful",
            message: "get all category attribute successful",
            data,
         });
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "fail", message: error });
      }
   }

   async getCategoryPrices(req, res) {
      try {
         const { id } = req.params;
         if (id === undefined) return errorRes(res);

         const data = await models.PriceRange.findAll({ where: { category_id: id } });

         res.status(200).json({
            status: "successful",
            message: "get all category price successful",
            data,
         });
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "error", message: error });
      }
   }
}

module.exports = new AppController();
