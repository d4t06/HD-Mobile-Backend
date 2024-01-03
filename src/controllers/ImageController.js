const models = require("../models");
const fs = require("fs");

function errorRes(res) {
   return res.status(402).json({ status: "error", message: "missing payload" });
}

class ImageController {
   async getImages(req, res) {
      try {
         const images = await models.Image.findAll({ order: [["createdAt", "DESC"]] });
         res.json(images);
      } catch (error) {
         console.log(error);
         res.status(500).json({ status: "error", message: "Get images error" });
      }
   }
   async addOne(req, res) {
      try {
         if (!req.file) {
            return errorRes(res);
         }

         const { filename, path, size } = req.file;
         const imageInfo = {
            name: filename,
            image_file_path: path,
            size: Math.floor(size / 1024),
            image_url: process.env.URL + "/" + path,
         };

         const newImage = await models.Image.create({ ...imageInfo });

         res.json({ status: "successful", message: "add image successful", image: newImage });
      } catch (error) {
         console.log(error);
      }
   }
   async deleteOne(req, res) {
      try {
         const imageData = req.body;

         if (!imageData) {
            return errorRes(res);
         }

         fs.rmSync(imageData.image_file_path, {
            force: true,
         });

         await models.Image.destroy({ where: { image_file_path: imageData.image_file_path } });

         res.status(201).json({
            status: "successful",
            message: "delete image successful",
         });
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "fail", message: "delete image error" });
      }
   }
}
module.exports = new ImageController();
