const models = require("../models");
const fs = require("fs");

const IMAGE_URL = "http://localhost:3000/";

class ImageController {
   async getImages(req, res) {
      try {
         const images = await models.Image.findAll({});

         res.json(images);
      } catch (error) {
         console.log(error);
         res.status(500).json({ status: "error", message: "Get images error" });
      }
   }
   async addOne(req, res) {
      try {
         if (!req.file) {
            return res.status(402).json({ status: "finish", message: "missing payload" });
         }

         const { filename, path, size } = req.file;
         const imageInfo = {
            name: filename,
            image_file_path: process.env.URL + "/" + path,
            size: Math.floor(size / 1024),
            image_url: path,
         };

         const newImage = await models.Image.create({ ...imageInfo });

         res.json({ status: "successful", message: "add image successful", image: newImage });
      } catch (error) {
         console.log(error);
      }
   }
   async deleteOne(req, res) {
      try {
         const { fileName } = req.params;

         console.log(fileName);

         //  remove on database
         //   await Image.deleteOne({name: fileName});

         // remove file
         fs.rmSync(`uploads/${fileName}`, {
            force: true,
         });

         res.status(201).json({
            status: "successful",
            message: "delete image sucessful",
         });
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "fail", message: "delete image error" });
      }
   }
}
module.exports = new ImageController();
