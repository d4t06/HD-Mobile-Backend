const { Op } = require("sequelize"); // operation
const db = require("../models/index");
// const testData = require('./testData')

class ProductsController {
   index(req, res) {
      const { page = 1, price, ...query } = req.query;
      const { order } = res.locals.sort;

      // xu li filter theo gia
      let priceFilter;
      if (!price) priceFilter = "";
      else {
         const [gthan, lthan] = price;
         priceFilter = {
            cur_price: {
               [Op.and]: {
                  [Op.gt]: +gthan * 1000000,
                  [Op.lt]: +lthan * 1000000,
               },
            },
         };
      }

      // xi li neu sort theo tra gop
      let newOrder = {
         order: order,
      };
      if (order && order[0][0] == "intallment") {
         newOrder = {
            where: {
               intallment: true,
               ...query,
               ...priceFilter,
            },
         };
      }
      // thực hiện tiềm kiếm
      console.log({ ...req.query, price: price, ...newOrder });
      console.log("offset = ", (+page - 1) * 6);
      db.Product.findAndCountAll({
         offset: (+page - 1) * 6, // so luong bo qua
         limit: 6, // gioi han tren mot lan lay

         // offset: 0, // so luong bo qua
         // limit: +page * 6, // gioi han tren mot lan lay
         where: {
            ...query,
            ...priceFilter,
         },
         ...newOrder,
         raw: true,
      })
         .then((data) => {
            return res.json(data);
         })
         .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "product controller error" });
         });
   }
   async getOne(req, res) {
      const { key } = req.params;

      try {
         const products = await db.Product.findOne({
            where: {
               href: key,
            },
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
            include: [
               {
                  model: db.Detail,
                  as: "data",
                  attributes: {
                     exclude: ["createdAt", "updatedAt"],
                  },
               },
            ],
         });
         res.json([products]);
      } catch {
         res.json("loi server");
      }
   }

   async search(req, res) {
      const { q } = req.query;
      if (!q) return res.json("missing query");
      // order = [[colum, type]]

      // boi vi order : '' thi duoc con order:[''] thi loi
      const { order } = res.locals.sort;

      // xu li sort theo tra gop
      let newOrder = {
         order: order,
      };
      if (order && order[0][0] == "intallment") {
         newOrder = {
            where: {
               intallment: true,
               name: {
                  [Op.like]: `${q}%`,
               },
            },
         };
      }

      if (!q.trim()) {
         res.status(500).json("invalid query");
      }
      try {
         const products = await db.Product.findAndCountAll({
            offset: 0,
            limit: 6,
            where: {
               name: {
                  [Op.like]: `${q}%`,
               },
            },
            ...newOrder,
         });

         res.json(products);
      } catch {
         res.status(500).json("loi server");
      }
   }
   async buy(req, res, next) {
      const { body } = req.body;
      console.log(body);
      try {
         await db.Order.create(body);
         res.json("insert successful");
      } catch {
         res.status(500).json("loi server");
      }
   }
}

module.exports = new ProductsController();
