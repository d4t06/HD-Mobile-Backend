const { Sequelize, Op } = require("sequelize");
const models = require("../models");

function errorRes(res, msg) {
   return res.status(402).json({ status: "error", message: msg || "missing payload" });
}

class OrderController {
   async getAllUserOrder(req, res) {
      try {
         const { username } = req.query;
         if (!username) {
            return errorRes(res);
         }

         const rows = await models.Order.findAll({
            where: {
               username,
            },
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

         return res.status(200).json(rows);
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "get all user error",
         });
      }
   }

   async getOrderDetail(req, res) {
      try {
         const { id } = req.params;
         if (!id) {
            return errorRes(res);
         }

         const data = await models.Order.findOne({
            where: {
               id,
            },
            include: {
               model: models.Order_Item,
               as: "items",
            },
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
                  [
                     Sequelize.fn(
                        "DATE_FORMAT",
                        Sequelize.col("deliveredAt") || "",
                        "%d-%m-%Y %H:%i:%s"
                     ),
                     "deliveredAt",
                  ],
                  [
                     Sequelize.fn(
                        "DATE_FORMAT",
                        Sequelize.col("canceledAt") || "",
                        "%d-%m-%Y %H:%i:%s"
                     ),
                     "canceledAt",
                  ],
               ],
            },
         });

         return res.status(200).json(data);
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "get order detail error",
         });
      }
   }

   async addNewOrder(req, res) {
      try {
         if (!req.body) {
            return errorRes(res);
         }
         const orderInfo = req.body;

         const newOrder = await models.Order.create(orderInfo);

         return res.status(200).json(newOrder);
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "order",
            message: "add order error",
         });
      }
   }

   async addOrderItem(req, res) {
      try {
         if (!req.body) {
            return errorRes(res);
         }
         const orderItemsInfo = req.body;

         await models.Order_Item.bulkCreate(orderItemsInfo);

         return res.status(200).json("add order items successful");
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "fail",
            message: "add order items error",
         });
      }
   }

   async updateOrderStatus(req, res) {
      try {
         if (!req.body) {
            return errorRes(res);
         }
         const orderInfo = req.body;
         const status = res.locals.status;

         if (orderInfo.id === undefined) return errorRes(res, "Missing id");

         const founderOrderItem = await models.Order.findOne({
            where: {
               id: orderInfo.id,
            },
         });

         if (!founderOrderItem) return errorRes(res, "order not found");

         const dateProps = {};

         switch (status) {
            case "canceled":
               if (
                  founderOrderItem.status === "delivering" ||
                  founderOrderItem.status === "completed"
               )
                  return errorRes(res, "Function denied");

               dateProps["canceledAt"] = Sequelize.fn("NOW");

               break;

            case "completed":
               if (
                  founderOrderItem.status === "canceled" ||
                  founderOrderItem.status === "processing"
               )
                  return errorRes(res, "Function denied");

               dateProps["deliveredAt"] = Sequelize.fn("NOW");
         }

         await models.Order.update(
            { status, ...dateProps },
            {
               where: {
                  id: orderInfo.id,
               },
            }
         );

         return res.status(200).json("update order status successful");
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "update order status error",
         });
      }
   }
}

module.exports = new OrderController();
