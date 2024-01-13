const models = require("../models");

const missPayloadError = (res, message = "missing payload") => {
   return res.status(402).json({ status: "finish", message });
};

class ProductDetailController {
   async add(req, res) {
      try {
         if (!req.body) {
            return missPayloadError(res);
         }

         const data = req.body;
          await models.Product_Detail.create(data);

         res.status(201).json({status: "successful", message: 'add product detail successful'});
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "add product detail error",
         });
      }
   }

   async update(req, res) {
      try {

         if (!req.body) {
            return missPayloadError(res);
         }

         const data = req.body
         const {id} = req.params

         if (id === undefined || data.content === undefined)
            return missPayloadError(res, "product detail data error");

         await models.Product_Detail.update(data, {where: {id}});

         res.status(201).json({
            status: "successful",
            message: "update product detail successful",
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "update product detail error",
         });
      }
   }
}

module.exports = new ProductDetailController();
