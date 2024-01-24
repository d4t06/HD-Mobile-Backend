const models = require("../models");

function errorRes(res, msg) {
   return res.status(402).json({ status: "error", message: msg || "missing payload" });
}

class CategoryPriceController {
   async addOnePriceRange(req, res) {
      try {
         const data = req.body;
         if (!data) {
            return errorRes(res);
         }

         const newRecord = await models.PriceRange.create(data);

         res.json({
            status: "successful",
            message: "add price range successful",
            data: newRecord,
         });
      } catch (error) {
         res.status(500).json({ status: "error", message: error.message });
      }
   }

   async updatePriceRange(req, res) {
      try {
         const attr = req.body;
         if (!attr || attr.id === undefined) return errorRes(res);

         await models.PriceRange.update(attr, { where: { id: attr.id } });
         res.json({ message: "update price range successful" });
      } catch (error) {
         res.status(500).json({ status: "error", message: error.message });
      }
   }

   async deletePriceRange(req, res) {
      const { id } = req.params;
      if (id === undefined) return errorRes(res);

      try {
         await models.PriceRange.destroy({ where: { id: id } });
         res.status(201).json({
            status: "successful",
            message: "delete price range successful",
         });
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "fail", message: error });
      }
   }
}

module.exports = new CategoryPriceController();
