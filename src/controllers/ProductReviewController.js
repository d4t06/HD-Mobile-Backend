const { Sequelize } = require("sequelize");
const models = require("../models");
const { convertDate } = require("../utils/appHelper");

const errorRes = (res, message = "missing payload") => {
   return res.status(402).json({ status: "finish", message });
};

const PAGE_SIZE = +process.env.PAGE_SIZE || 6;

class ProductReviewController {
   // for admin only
   async getAllReviews(req, res) {
      try {
         const { page = 1 } = req.query;
         const { rows, count } = await models.Rate.findAndCountAll({
            offset: (+page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            order: [["createdAt", "DESC"]],
            include: {
               model: models.Product,
               as: "product_data",
               attributes: ["product_name"],
            },
         });

         if (rows.length) {
            rows.forEach((item) => {
               item["date_convert"] = convertDate(item.createdAt);
               // const reply = item.reply_data;
               // if (reply) {
               //    item.reply_data["date_convert"] = convertDate(reply.createdAt);
               // }
            });
         }

         return res.json({
            product_name_ascii: "",
            page: +page,
            reviews: rows,
            count,
            page_size: PAGE_SIZE,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error });
      }
   }

   // for admin only
   async getProductReviews(req, res) {
      try {
         const { id } = req.params;
         const { page = 1 } = req.query;

         if (id === undefined) return errorRes(res, "bad request");

         const { rows, count } = await models.Question.findAndCountAll({
            offset: (+page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            where: {
               product_name_ascii: id,
            },
            include: {
               model: models.Answer,
               as: "reply_data",
            },
         });

         if (rows.length) {
            rows.forEach((item) => {
               item["approve"] = convertDate(item.createdAt);
               const reply = item.reply_data;
               if (reply) {
                  item.reply_data["date_convert"] = convertDate(reply.createdAt);
               }
            });
         }

         return res.json({
            product_name_ascii: id,
            page: +page,
            reviews: rows,
            count,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error });
      }
   }

   // for admin only
   async delete(req, res) {
      try {
         const { id } = req.params;

         await models.Rate.destroy({ where: { id } });

         res.status(201).json({
            status: "successful",
            message: "delete review successful",
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "delete review error",
         });
      }
   }

   // for admin only
   async rely(req, res) {
      try {
         if (!req.body) {
            return errorRes(res);
         }

         const data = req.body;

         if (!data.q_id || !data.content) {
            return errorRes(res, "reply data error");
         }

         await models.Answer.create(data);

         res.status(201).json({ status: "successful", message: "reply successful" });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "reply error",
         });
      }
   }

   // for admin only
   async approve(req, res) {
      try {
         if (!req.body) {
            return errorRes(res);
         }

         const { id } = req.body;

         if (id === undefined) {
            return errorRes(res, "approve data error");
         }

         await models.Rate.update({ approve: 1 }, { where: { id } });

         res.status(201).json({ status: "successful", message: "approve review successful" });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "approve review  error",
         });
      }
   }

   async getProductReviewsClient(req, res) {
      try {
         const { id } = req.params;
         const { page = 1 } = req.query;

         const { rows, count } = await models.Rate.findAndCountAll({
            offset: (+page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            // include: {
            //    model: models.Answer,
            //    as: "reply_data",
            //    where: {
            //       q_id: { [Op.not]: null },
            //    },
            // },
            where: { product_name_ascii: id, approve: 1 },
         });

         if (rows.length) {
            rows.forEach((item) => {
               item["approve"] = convertDate(item.createdAt);
               // const reply = item.reply_data;
               // if (reply) {
               //    item.reply_data["date_convert"] = convertDate(reply.createdAt);
               // }
            });
         }

         return res.json({
            product_name_ascii: id,
            page: +page,
            reviews: rows,
            count,
            page_size: PAGE_SIZE,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error });
      }
   }

   async getAverage(req, res) {
      try {
         const { id } = req.params;

         const average = await models.Rate.findOne({
            attributes: [[Sequelize.fn("AVG", models.sequelize.col("rate")), "average"]],
            where: { product_name_ascii: id, approve: 1 },
         });

         return res.json(average);
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error });
      }
   }

   async add(req, res) {
      try {
         if (!req.body) return missPayloadError(res);

         const data = req.body;
         await models.Rate.create(data);

         res.status(201).json({ status: "successful", message: "review  successful" });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "review error",
         });
      }
   }

   async like(req, res) {}
}

module.exports = new ProductReviewController();
