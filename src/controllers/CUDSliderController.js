const models = require("../models");

const missPayloadError = (res) => {
   res.status(402).json({ status: "finish", message: "missing payload" });
};

class CUDSliderController {
   async add(req, res) {
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

   // async updateOne(req, res) {
   //    try {
   //       if (!req.body) {
   //          return missPayloadError(res);
   //       }

   //       const { product_name_ascii, storage_name_ascii, ...storageInfo } = req.body;

   //       if (!storageInfo.product_name_ascii) return missPayloadError(res);

   //       await models.Product_Storage.update(
   //          { ...storageInfo },
   //          {
   //             where: {
   //                product_name_ascii,
   //                storage_name_ascii,
   //             },
   //          }
   //       );

   //       res.status(201).json({
   //          status: "successful",
   //          message: "update successful",
   //       });
   //    } catch (error) {
   //       res.json({
   //          status: "update error",
   //          message: error,
   //       });
   //    }
   // }

   async delete(req, res) {
      try {
         const { id } = req.params;
         if (!id) return missPayloadError(res);

         await models.Slider.bulkDestroy({ where: { id } });

         res.status(201).json({
            // status: "successful",
            message: "delete slider successful",
         });
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "fail", message: error });
      }
   }
}

module.exports = new CUDSliderController();
