const { Sequelize } = require("sequelize");
const models = require("../models");

const PAGE_SIZE = +process.env.PAGE_SIZE || 6;

function errorRes(res, msg) {
   return res.status(402).json({ status: "error", message: msg || "missing payload" });
}

class ManageOrderController {
   async getAllOrders(req, res) {
      try {
         const { page = 1 } = req.query;
         const status = res.locals.status;

         const where = {};

         if (status) where["status"] = status;

         const { rows, count } = await models.Order.findAndCountAll({
            offset: (+page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            where,
            order: [["createdAt", "DESC"]],
            attributes: {
               include: [
                  [
                     Sequelize.fn(
                        "DATE_FORMAT",
                        Sequelize.col("createdAt"),
                        "%d-%m-%Y %H:%i:%s"
                     ),
                     "createdAt",
                  ],
               ],
            },
            include: {
               model: models.Order_Item,
               as: "items",
               limit: 1,
            },
         });

         return res.status(200).json({
            status,
            count,
            page: +page,
            page_size: PAGE_SIZE,
            orders: rows,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "get all user error",
         });
      }
   }

   async updateStatus(req, res) {
      try {
         const { id } = req.body;
         const status = res.locals.status;

         if (!id) {
            return errorRes(res, "missing id");
         }

         await models.Order_Item.update(
            { status },
            {
               where: {
                  id,
               },
            }
         );

         res.status(200).json("update order status successful");
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "update order status error",
         });
      }
   }
}

module.exports = new ManageOrderController();
