const models = require("../models");

class CUDController {
   async getUser(req, res) {
      try {
         const users = await User.find({});
         res.json(users);
      } catch (error) {
         res.status(500).json("loi server");
      }
   }

   async addOne(req, res) {
      try {
         if (!req.body) {
            return res.status(402).json({ status: "finish", message: "missing payload" });
         }

         const productInfo = req.body;

         // check info
         if (!productInfo.brand_name_ascii || !productInfo.category_name_ascii)
            return res.status(402).json({ status: "finish", message: "missing payload" });

         const newProduct = await models.Product.create({ ...productInfo });

         res.status(201).json(newProduct);
      } catch (error) {
         console.log(error);
         res.json({
            status: "fail",
            message: "insert error",
         });
      }
   }

   async updateOne(req, res) {
      try {
         if (!req.body) {
            return res.status(402).json({ status: "finish", message: "missing payload" });
         }

         const productInfo = req.body;

         if (!productInfo.name || !productInfo.category_name)
            return res.status(402).json({ status: "finish", message: "missing payload" });

         await models.Product.update({ ...productInfo }, { where: { product_id: productInfo.product_id } });

         res.status(201).json({
            status: "successful",
            message: "update successful",
         });
      } catch (error) {
         res.json({
            status: "update error",
            message: error,
         });
      }
   }
   async deleteOne(req, res) {
      try {
         const { id } = req.params;

         // remove on database
         await models.Product.destroy({ where: { product_id: id } });

         // // remove on file
         // fs.rmSync(`uploads/${href}.jpg`, {
         //    force: true,
         // });

         res.status(201).json({
            status: "successful",
            message: "delete sucessful",
         });
      } catch (error) {
         res.status(501).json({ status: "fail", message: error });
      }
   }
}

module.exports = new CUDController();
