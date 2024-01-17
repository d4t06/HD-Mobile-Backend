const models = require("../models");

const errorRes = (res, message = "missing payload") => {
   res.status(402).json({ status: "finish", message });
};

class CUDColorController {
   async add(req, res) {
      try {
         if (!req.body) {
            return errorRes(res);
         }
         const colorsData = req.body;
         const newColors = await models.Product_Color.create(colorsData);

         res.status(201).json(newColors);
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "insert color error",
         });
      }
   }

   async updateOne(req, res) {
      try {
         if (!req.body) {
            return errorRes(res);
         }
         const { id } = req.params;
         const data = req.body;

         if (!id) return errorRes(res, "bad request");

         await models.Product_Color.update(data, {
            where: { id },
         });

         res.status(201).json({
            status: "successful",
            message: "update color successful",
         });
      } catch (error) {
         console.log(error);
         res.json({
            status: "update error",
            message: error,
         });
      }
   }

   async delete(req, res) {
      try {
         if (!req.body) {
            return errorRes(res);
         }

         const {id} = req.params;
         if (!id) return errorRes(res);

         await models.Product_Color.destroy({ where: { id } });

         res.status(201).json({
            status: "successful",
            message: "delete color successful",
         });
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "fail", message: error });
      }
   }
}

module.exports = new CUDColorController();
