const { Op, where, or, Sequelize } = require("sequelize"); // operation
const models = require("../models");

const PAGE_SIZE = +process.env.PAGE_SIZE || 6;

class ProductsController {
   async getProducts(req, res) {
      const { page = 1, price, brand_id } = req.query;
      const { category: category_id = "dtdd" } = req.params;

      console.log("check req.query", req.query);

      // res.sendStatus(200)
      // return

      // handle price range
      let priceFilter;
      if (!price) priceFilter = "";
      else {
         const [gThan, lThan] = price; // [1,10]
         priceFilter = {
            price: {
               [Op.and]: {
                  [Op.gt]: +gThan * 1000000,
                  [Op.lt]: +lThan * 1000000,
               },
            },
         };
      }

      const { enable, type, column } = res.locals.sort;
      let order = [];
      let where = { category_id };

      if (enable) {
         if (column === "installment") {
            where["installment"] = 1;
         } else {
            order = [[{ model: models.Product_Variant, as: "variants_data" }, column, type]];
         }
      }

      console.log(">>>check where, ", where);
      console.log(">>>check order, ", order);

      try {
         const { rows, count } = await models.Product.findAndCountAll({
            offset: (+page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            distinct: true,
            // include: [
            //    {
            //       model: models.Product_Storage,
            //       where: {
            //          ...priceFilter,
            //          default: true,
            //       },
            //       as: "storage_data",
            //    },
            // ],
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
            order,
         });

         let variants_data = [];
         const productIds = rows.map((p) => p.product_id) || [];

         if (productIds) {
            variants_data = await models.Product_Storage.findAll({
               where: { product_name_ascii: productIds },
            });
         }

         return res.json({
            brand_id,
            category_id,
            order: [column, type],
            price,
            page_size: PAGE_SIZE,
            count,
            products: rows,
            variants_data,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: "product controller error" });
      }
   }

   async getDetail(req, res) {
      const { id } = req.params;

      try {
         const products = await models.Product.findOne({
            where: {
               product_id: id,
            },
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
            include: [
               {
                  model: models.Detail,
                  as: "detail",
                  attributes: {
                     exclude: ["createdAt", "updatedAt", "id"],
                  },
               },
               {
                  model: models.Product_Variant,
                  as: "variants_data",
                  attributes: {
                     exclude: ["createdAt", "updatedAt", "product_id", "id"],
                  },
                  include: [
                     {
                        model: models.Product_Variant_Option,
                        as: "options_data",
                        attributes: {
                           exclude: ["createdAt", "updatedAt", "variant_id", "id"],
                        },
                        include: [
                           {
                              model: models.Product_Option,
                              as: "option_data",
                              attributes: {
                                 exclude: ["createdAt", "updatedAt", "option_id", "id"],
                              },
                           },
                        ],
                     },
                  ],
               },
            ],
         });
         res.json(products);
      } catch (err) {
         console.log(err);
         res.status(500).json({ message: err });
      }
   }

   async search(req, res) {
      const { q, page = 1, brand_name = [] } = req.query;
      if (!q.trim()) return res.status(500).json("missing query");

      console.log(">>> check query, ", { q });

      const { enable, type, column } = res.locals.sort;
      let order = [];
      let where = {
         name: {
            [Op.like]: `${q}%`,
         },
      };
      if (brand_name.length) where["brand_name"] = brand_name;

      if (enable) {
         if (column === "installment") {
            where["installment"] = 1;
         } else {
            order = [[column, type]];
         }
      }

      try {
         const { rows, count } = await models.Product.findAndCountAll({
            offset: (+page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            where,
            order,
         });

         res.json({ count, products: rows, page_size: PAGE_SIZE });
      } catch (error) {
         console.log(error);
         res.status(500).json("loi server");
      }
   }
   async buy(req, res, next) {
      const { body } = req.body;
      console.log(body);
      try {
         await models.Order.create(body);
         res.json("insert successful");
      } catch {
         res.status(500).json("loi server");
      }
   }
}

module.exports = new ProductsController();
