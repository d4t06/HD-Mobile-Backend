const models = require("../models");

const missPayloadError = (res, msg) => {
   res.status(402).json({ status: "finish", message: msg || "missing payload" });
};

class CUDController {
   async add(req, res) {
      try {
         if (!req.body) {
            return missPayloadError(res);
         }

         const storageInfo = req.body;
         if (!storageInfo) return missPayloadError(res);

         const newStorage = await models.Product_Storage.create(storageInfo);

         res.status(201).json(newStorage);
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "insert storage error",
         });
      }
   }

   async updateOne(req, res) {
      try {
         if (!req.body) {
            return missPayloadError(res);
         }

         const data = req.body;
         const { id } = req.params;

         if (!id) return missPayloadError(res, "bad request");

         await models.Product_Storage.update(data, {
            where: { id },
         });

         res.status(201).json({
            status: "update storage successful",
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "update storage error",
            message: error,
         });
      }
   }
   async delete(req, res) {
      try {
         const {id} = req.params;
         if (!id) return missPayloadError(res);

         await models.Product_Storage.destroy({ where: { id } });

         res.status(201).json({
            status: "successful",
            message: "delete storage successful",
         });
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "fail", message: error });
      }
   }
}

module.exports = new CUDController();
