const models = require("../models");

const missPayloadError = (res, msg) => {
   res.status(402).json({ status: "error", message: msg || "missing payload" });
};

class CUDSliderController {
   async addSlider(req, res) {
      try {
         if (!req.body) {
            return missPayloadError(res);
         }

         const sliderData = req.body;
         if (!sliderData) return missPayloadError(res);

         const newSlider = await models.Slider.create(sliderData);

         res.status(200).json(newSlider);
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "insert slider error",
         });
      }
   }

   async addProductSlider(req, res) {
      try {
         if (!req.body) {
            return missPayloadError(res);
         }

         const data = req.body;

         data.forEach((item) => {
            if (!item.color_id || !item.slider_id || !item.product_name_ascii) {
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

   async addCategorySlider(req, res) {
      try {
         if (!req.body) {
            return missPayloadError(res);
         }

         const data = req.body;

         if (!data.category_id || !data.slider_id) {
            return missPayloadError(res, "category slider data error");
         }

         const result = await models.Category_Slider.create(data);

         res.status(201).json(result);
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "insert category slider error",
         });
      }
   }
   
   async getAllCategorySlider(req, res, next) {
      try {
         const slider = await models.Category_Slider.findAll({
            attributes: [],
            include: [
               {
                  model: models.Category,
                  as: "category_data",
               },
               {
                  model: models.Slider,
                  as: "slider_data",
                  include: {
                     model: models.Slider_Image,
                     as: "images",
                  },
               },
            ],
         });
         res.status(200).json(slider);
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error.message });
      }
   }

   async getCategorySlider(req, res, next) {
      try {
         const { category_ascii } = req.params;

         console.log("check category_ascii", category_ascii);

         if (!category_ascii) return errorRes(res, "Invalid category");

         const slider = await models.Category_Slider.findOne({
            include: [
               {
                  model: models.Category,
                  as: "category_data",
                  where: { category_ascii },
                  attributes: ["category_ascii"],
               },
               {
                  model: models.Slider,
                  as: "slider_data",
                  include: {
                     model: models.Slider_Image,
                     as: "images",
                  },
               },
            ],
         });
         res.status(200).json(slider);
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error.message });
      }
   }

   async addImages(req, res) {
      try {
         if (!req.body) {
            return missPayloadError(res);
         }

         const imagesData = req.body;
         if (!imagesData) return missPayloadError(res);

         await models.Slider_Image.bulkCreate(imagesData);

         res.status(200).json({ message: "images slider successful" });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "insert slider error",
         });
      }
   }

   async deleteImage(req, res) {
      try {
         const { id } = req.params;
         if (!id) return missPayloadError(res);

         await models.Slider_Image.destroy({ where: { id } });

         res.status(201).json({
            status: "successful",
            message: "delete slider successful",
         });
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "error", message: "delete slider successful" });
      }
   }
}

module.exports = new CUDSliderController();
