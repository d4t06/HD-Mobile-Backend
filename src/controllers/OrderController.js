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
               include: {
                  model: models.Order_Item,
                  as: "items",
               },
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

         // if (
         //    orderItemInfo.color_id === undefined ||
         //    cartItemInfo.storage_id === undefined ||
         //    cartItemInfo.product_name_ascii === undefined
         // )
         //    return errorRes(res, "Bad request");

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
}

module.exports = new OrderController();
