const { Sequelize, Op } = require("sequelize");
const models = require("../models");

function errorRes(res, msg) {
   return res.status(402).json({ status: "error", message: msg || "missing payload" });
}

class CartController {
   async getCartDetail(req, res) {
      try {
         const { username } = req.params;
         if (!username) {
            return errorRes(res);
         }

         const { rows, count } = await models.Cart_Item.findAndCountAll({
            distinct: true,
            where: {
               username,
               "$product_data.combines_data.storage_id$": { [Op.col]: "Cart_Item.storage_id" },
               "$product_data.combines_data.color_id$": { [Op.col]: "Cart_Item.color_id" },
            },

            include: [
               {
                  model: models.Product,
                  as: "product_data",
                  include: [
                     {
                        model: models.Product_Combine,
                        as: "combines_data",
                        attributes: ["price"],
                     },
                     {
                        model: models.Product_Storage,
                        as: "storages_data",
                        attributes: ["storage", "id"],
                     },
                     {
                        model: models.Product_Color,
                        as: "colors_data",
                        attributes: ["color", "id"],
                     },
                  ],
               },
            ],
         });

         let total_price = 0;

         if (rows.length) {
            rows.forEach((item) => {
               const itemPrice = item.product_data.combines_data[0].price;
               if (!itemPrice)
                  return res.status(500).json({
                     status: "error",
                     message: "get cart detail error",
                  });

               total_price += itemPrice * item.amount;
            });
         }

         return res.status(200).json({
            items: rows,
            count: count,
            username,
            total_price,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "get cart detail error",
         });
      }
   }

   async addNewCart(req, res) {
      try {
         if (!req.body) {
            return errorRes(res);
         }
         const cartInfo = req.body;

         await models.Cart.create(cartInfo);

         return res.status(200).json("add cart successful");
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "fail",
            message: "add cart error",
         });
      }
   }

   async addCartItem(req, res) {
      try {
         if (!req.body) {
            return errorRes(res);
         }
         const cartItemInfo = req.body;

         if (
            cartItemInfo.color_id === undefined ||
            cartItemInfo.storage_id === undefined ||
            cartItemInfo.product_name_ascii === undefined
         )
            return errorRes(res, "Bad request");

         await models.Cart_Item.create(cartItemInfo);

         return res.status(200).json("add cart item successful");
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "fail",
            message: "add cart item error",
         });
      }
   }

   async updateCartItem(req, res) {
      try {
         if (!req.body) {
            return errorRes(res);
         }
         const cartItemInfo = req.body;

         if (cartItemInfo.color_id === undefined || cartItemInfo.storage_id === undefined || cartItemInfo.amount === 0)
            return errorRes(res, "Cart item data error");

         await models.Cart_Item.update(cartItemInfo, { where: { id: cartItemInfo.id } });

         return res.status(200).json("update cart item successful");
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "update cart item error",
         });
      }
   }

   async deleteCartItem(req, res) {
      try {
         const { id } = req.params;
         await models.Cart_Item.destroy({ where: { id } });

         return res.status(200).json("delete cart item successful");
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "delete cart item error",
         });
      }
   }
}

module.exports = new CartController();
