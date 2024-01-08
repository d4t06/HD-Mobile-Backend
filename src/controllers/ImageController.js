const cloudinary = require("cloudinary").v2;
cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUD_API_KEY,
   api_secret: process.env.CLOUD_API_SECRET,
   // secure: true,
});

const models = require("../models");
const { generateId } = require("../utils/appHelper");

const PAGE_SIZE = +process.env.IMAGE_PAGE_SIZE || 8;

function errorRes(res) {
   return res.status(402).json({ status: "error", message: "missing payload" });
}

class ImageController {
   async getImages(req, res) {
      const { page = 1 } = req.query;
      try {
         const images = await models.Image.findAll({
            offset: (+page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            order: [["createdAt", "DESC"]],
         });
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

         const { buffer, mimetype, originalname, size } = req.file;

         const b64 = Buffer.from(buffer).toString("base64");
         let dataURI = "data:" + mimetype + ";base64," + b64;

         const imageUploadRes = await cloudinary.uploader.upload(dataURI, {
            resource_type: "auto",
         });

         const imageInfo = {
            name: generateId(originalname),
            public_id: imageUploadRes.public_id,
            image_url: imageUploadRes.url,
            size: Math.ceil(size / 1000),
         };

         const newImage = await models.Image.create({ ...imageInfo });

         res.status(200).json({ status: "successful", message: "add image successful", data: newImage });
      } catch (error) {
         console.log(error);
         res.status(500).json({ status: "failed", message: "upload image failed" });
      }
   }
   async deleteOne(req, res) {
      try {
         const { id } = req.params;

         if (!id) {
            return errorRes(res);
         }

         await cloudinary.uploader.destroy(id);
         await models.Image.destroy({ where: { public_id: id } });

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
