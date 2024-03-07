const models = require("../models");

const missPayloadError = (res, message = "missing payload") => {
   res.status(402).json({ status: "finish", message });
};

class CDProductSliderController {
   async add(req, res) {
      try {
         if (!req.body) {
            return missPayloadError(res);
         }

         const data = req.body;

         data.forEach((item) => {
            if (!item.color_id || !item.slider_id || !item.product_ascii) {
               return missPayloadError(res, "product slider data error");
            }
         });

         const newProductSlider = await models.Product_Slider.bulkCreate(data);

         res.status(201).json(newProductSlider);
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "insert storage error",
         });
      }
   }
}

module.exports = new CDProductSliderController();
