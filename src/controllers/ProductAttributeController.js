const models = require("../models");

const missPayloadError = (res, message = "missing payload") => {
   return res.status(402).json({ status: "finish", message });
};

class CDProductSliderController {
   async addMany(req, res) {
      try {
         if (!req.body) {
            return missPayloadError(res);
         }

         const data = req.body;

         data.forEach((item) => {
            if (!item.category_attr_id || !item.product_name_ascii || !item.value) {
               return missPayloadError(res, "product attribute data error");
            }
         });

          await models.Product_Attribute.bulkCreate(data);

         res.status(201).json({status: "successful", message: 'add product attributes successful'});
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "add product datas error",
         });
      }
   }

   async updateOne(req, res) {
      try {

         if (!req.body) {
            return missPayloadError(res);
         }

         const data = req.body
         const {id} = req.params

         if (id === undefined)
            return missPayloadError(res, "product attribute data error");

         const newProductSlider = await models.Product_Attribute.update(data, {where: {id}});

         res.status(201).json({
            status: "successful",
            message: "update product attribute successful",
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "update product attribute error",
         });
      }
   }
}

module.exports = new CDProductSliderController();
