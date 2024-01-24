const models = require("../models");

function errorRes(res, msg) {
   return res.status(402).json({ status: "error", message: msg || "missing payload" });
}

class BranController {

   async addBrand(req, res) {
      try {
         const brand = req.body;
         if (!brand) {
            return res.status(402).json({ status: "finish", message: "missing payload" });
         }

         const newBrand = await models.Brand.create({ ...brand });

         res.json({ status: "200", message: "Add brand successful", data: newBrand });
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }

   async updateBrand(req, res) {
      try {
         const brand = req.body;
         if (!brand || !brand.id) {
            return res.status(402).json({ status: "error", message: "missing payload" });
         }

         await models.Brand.update({ ...brand }, { where: { id: brand.id } });
         res.json({ message: "update brand successful" });
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }

   async deleteBrand(req, res) {
      const { id } = req.params;
      if (!id) return errorRes(res);

      try {
         await models.Brand.destroy({ where: { id } });
         res.status(201).json({
            status: "successful",
            message: "delete brand successful",
         });
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "fail", message: error });
      }
   }
}

module.exports = new BranController();
