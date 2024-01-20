const { Op } = require("sequelize");
const models = require("../models");
const { convertDate } = require("../utils/appHelper");

const errorRes = (res, message = "missing payload") => {
   return res.status(402).json({ status: "error", message });
};

const PAGE_SIZE = +process.env.PAGE_SIZE || 6;

class ProductCommentController {
   // for admin
   async getAllComments(req, res) {
      try {
         const { page = 1 } = req.query;
         const { rows, count } = await models.Question.findAndCountAll({
            offset: (+page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            include: {
               model: models.Answer,
               as: "reply_data",
            },
            order: [["createdAt", "DESC"]],
         });

         if (rows.length) {
            rows.forEach((item) => {
               item["date_convert"] = convertDate(item.createdAt);
               const reply = item.reply_data;
               if (reply) {
                  item.reply_data["date_convert"] = convertDate(reply.createdAt);
               }
            });
         }

         return res.json({
            product_name_ascii: "",
            page: +page,
            comments: rows,
            count,
            page_size: PAGE_SIZE,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error });
      }
   }

   // for admin
   async getProductComments(req, res) {
      try {
         const { id } = req.params;
         const { page = 1 } = req.query;

         if (id === undefined) return errorRes(res, "bad request");

         const comments = await models.Question.findAll({
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

         if (comments.length) {
            comments.forEach((item) => {
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
            comments,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error });
      }
   }

   async getProductCommentsClient(req, res) {
      try {
         const { id } = req.params;

         const { page = 1 } = req.query;

         const { rows, count } = await models.Question.findAndCountAll({
            offset: (+page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            include: {
               model: models.Answer,
               as: "reply_data",
               where: {
                  q_id: { [Op.not]: null },
               },
            },
            where: { product_name_ascii: id },
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
            comments: rows,
            page_size: PAGE_SIZE,
            count,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error });
      }
   }

   async addComment(req, res) {
      try {
         if (!req.body) {
            return errorRes(res);
         }

         const data = req.body;

         if (!data.content || !data.cus_name) {
            return errorRes(res, "comment data error");
         }

         await models.Question.create(data);

         res.status(201).json({ status: "successful", message: "comment successful" });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "add comment error",
         });
      }
   }

   async likeComment(req, res) {
      try {
         if (!req.body) return errorRes(res);

         // type: "QUESTION" | "ANSWER"
         const { id } = req.body;
         if (id == undefined) return errorRes(res, "like data error");

         // if (type === "ANSWER") {
         //    const founder = await models.Answer.findOne({ where: { id } });

         //    console.log("check answer", founder);
         //    if (!founder) return errorRes(res, "Not found answer");

         //    await models.Answer.update({ total_like: founder.total_like + 1 }, { where: { id } });
         //    return res.status(201).json({ status: "successful", message: "like successful" });
         // }

         const founder = await models.Question.findOne({ where: { id } });
         if (!founder) return errorRes(res, "Not found comment");

         await models.Question.update({ total_like: founder.total_like + 1 }, { where: { id } });
         res.status(201).json({ status: "successful", message: "reply successful" });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "like error",
         });
      }
   }

   async unLikeComment(req, res) {
      try {
         if (!req.body) return errorRes(res);

         const { id } = req.body;
         if (id == undefined) return errorRes(res, "reply data error");

         const founder = await models.Question.findOne({ where: { id } });
         if (!founder) return errorRes(res, "Not found question");

         await models.Question.update({ total_like: founder.total_like - 1 }, { where: { id } });
         res.status(201).json({ status: "successful", message: "Unlike question successful" });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "Unlike question error",
         });
      }
   }

   async delete(req, res) {
      try {
         const { id } = req.params;

         await models.Question.destroy({ where: { id } });

         res.status(201).json({ status: "successful", message: "delete comment successful" });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "delete comment error",
         });
      }
   }

   async addReply(req, res) {
      try {
         if (!req.body) return errorRes(res);

         const data = req.body;
         if (!data.q_id || !data.content) return errorRes(res, "reply data error");

         const newReply = await models.Answer.create(data);

         res.status(201).json({ status: "successful", message: "reply successful", data: newReply });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "reply error",
         });
      }
   }

   async editReply(req, res) {
      try {
         const { id } = req.params;
         if (!req.body || !id) return errorRes(res);

         const { content } = req.body;

         if (!content) return errorRes(res, "reply data error");

         await models.Answer.update({ content }, { where: { id } });

         res.status(201).json({ status: "successful", message: "update reply successful" });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "update reply error",
         });
      }
   }
}

module.exports = new ProductCommentController();
