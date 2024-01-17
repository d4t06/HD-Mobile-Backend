const models = require("../models");

const missPayloadError = (res) => {
   res.status(402).json({ status: "finish", message: "missing payload" });
};

class CUDCombineController {
   async add(req, res) {
      try {
         if (!req.body) {
            return missPayloadError(res);
         }

         const combinesData = req.body;
         if (!combinesData) return missPayloadError(res);

         const combine = await models.Product_Combine.bulkCreate(combinesData);

         res.status(201).json(combine);
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "add  combine error",
         });
      }
   }

   async updateOne(req, res) {
      try {
         if (!req.body) {
            return missPayloadError(res);
         }

         const { id } = req.params;
         const data = req.body;

         await models.Product_Combine.update(data, { where: { id } });

         res.status(201).json({ message: "update combine successful" });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "update combine error",
            message: error,
         });
      }
   }

   async delete(req, res) {
      try {
         if (!req.body) {
            return missPayloadError(res);
         }

         const ids = req.body;
         if (!ids) return missPayloadError(res);

         await models.Product_Combine.bulkDestroy({ where: { id: ids } });

         res.status(201).json({
            status: "successful",
            message: "delete combine successful",
         });
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "fail", message: error });
      }
   }
}

module.exports = new CUDCombineController();
