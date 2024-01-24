const models = require("../models");

function errorRes(res, msg) {
   return res.status(402).json({ status: "error", message: msg || "missing payload" });
}

class CategoryAttributeController {
   async addAttribute(req, res) {
      try {
         const attr = req.body;
         if (!attr) {
            return errorRes(res);
         }

         const newAttr = await models.Category_Attribute.create(attr);

         res.json({
            status: "successful",
            message: "add category attribute successful",
            data: newAttr,
         });
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }

   async updateAttribute(req, res) {
      try {
         const attr = req.body;
         if (!attr || attr.id === undefined) return errorRes(res);

         await models.Category_Attribute.update(attr, { where: { id: attr.id } });
         res.json({ message: "update category attribute successful" });
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }

   async deleteAttribute(req, res) {
      const { id } = req.params;
      if (id === undefine) return errorRes(res);

      try {
         await models.Category_Attribute.destroy({ where: { id: id } });
         res.status(201).json({
            status: "successful",
            message: "delete category attribute successful",
         });
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "fail", message: error });
      }
   }
}

module.exports = new CategoryAttributeController();
