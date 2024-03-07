const models = require("../models");

function errorRes(res, msg) {
   return res.status(402).json({ status: "error", message: msg || "missing payload" });
}

class CategoryController {
   // for admin only
   async getAllCategory(req, res, next) {
      try {
         const categories = await models.Category.findAll({
            where: { hidden: 0 },
            include: [
               {
                  model: models.Category_Attribute,
                  as: "attributes",
               },
               {
                  model: models.PriceRange,
                  as: "price_ranges",
               },
               {
                  model: models.Brand,
                  as: "brands",
               },
            ],
         });
         res.json(categories);
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error.message });
      }
   }

   async addCategory(req, res) {
      try {
         const category = req.body;
         if (!category) {
            return res.status(402).json({ status: "error", message: "missing payload" });
         }

         const newCategory = await models.Category.create({ ...category });

         const fullCategory = await models.Category.findOne({
            where: { id: newCategory.id },
            include: [
               {
                  model: models.Category_Attribute,
                  as: "attributes",
               },
               {
                  model: models.PriceRange,
                  as: "price_ranges",
               },
               {
                  model: models.Brand,
                  as: "brands",
               },
            ],
         });

         res.json(fullCategory);
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }

   async updateCategory(req, res) {
      try {
         const category = req.body;
         const { id } = req.params;
         if (!category) {
            return res.status(402).json({ status: "error", message: "missing payload" });
         }

         console.log(">>> check update category", category);

         await models.Category.update({ ...category }, { where: { id } });
         res.json({ message: "update category successful" });
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }

   async deleteCategory(req, res) {
      const { id } = req.params;
      if (!id) return errorRes(res);

      try {
         await models.Category.destroy({ where: { id: id } });
         res.status(201).json({
            status: "successful",
            message: "delete category successful",
         });
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "fail", message: error });
      }
   }
}

module.exports = new CategoryController();
