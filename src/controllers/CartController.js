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

      const cartDetail = await models.Cart.findOne({
        where: { username },
        include: {
          model: models.Cart_Item,
          as: "items",
          include: {
            model: models.Product,
            as: "product_data",
            include: {
              model: models.Product_Combine,
            //   where: {
            //     ...priceFilter,
            //     default: true,
            //   },
              as: "combines_data",
            },
          },
        },
      });

      return res.status(200).json(cartDetail);
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

  async updateCartItem() {}
}

module.exports = new CartController();
