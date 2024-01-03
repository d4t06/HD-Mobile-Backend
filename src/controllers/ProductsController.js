const { Op, where, or, Sequelize } = require("sequelize"); // operation
const models = require("../models");

const PAGE_SIZE = +process.env.PAGE_SIZE || 6;

class ProductsController {
   async getProducts(req, res) {
      const { page = 1, price, brand_id, category_id } = req.query;

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

      if (brand_id) where['brand_id'] = brand_id;

      if (enable) {
         if (column === "installment") {
            where["installment"] = 1;
         } else {
            order = [[{ model: models.Product_Combine, as: "combines_data" }, column, type]];
         }
      }

      console.log(">>>check where, ", where);
      console.log(">>>check order, ", order);

      try {
         const { rows, count } = await models.Product.findAndCountAll({
            offset: (+page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            distinct: true,
            include: [
               {
                  model: models.Product_Combine,
                  where: {
                     ...priceFilter,
                     default: true,
                  },
                  as: "combines_data",
               },
            ],
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
            where,
            order,
         });

         let variants_data = [];
         const productIds = rows.map((p) => p.product_name_ascii) || [];

         console.log("check ids", productIds);

         if (productIds) {
            variants_data = await models.Product_Storage.findAll({
               where: { product_name_ascii: { [Sequelize.Op.in]: productIds } },
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

      if (!id) {
         return res.status(404).json({ message: "missing query" });
      }

      try {
         const product = await models.Product.findOne({
            where: {
               product_name_ascii: id,
            },
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
            include: [
               {
                  model: models.Detail,
                  as: "detail",
                  attributes: {
                     exclude: ["createdAt", "updatedAt"],
                  },
               },
               {
                  model: models.Product_Storage,
                  as: "storages_data",
               },
               {
                  model: models.Product_Color,
                  as: "colors_data",
               },
               {
                  model: models.Product_Slider,
                  as: "sliders_data",
                  include: [
                     {
                        model: models.Slider,
                        as: "slider_data",
                        include: {
                           model: models.Slider_Image,
                           // attributes: ["image_url"],
                           as: "images",
                        },
                     },
                     {
                        model: models.Product_Color,
                        as: "color_data",
                        attributes: ["color", "color_ascii"],
                     },
                  ],
               },
               {
                  model: models.Product_Combine,
                  as: "combines_data",
                  include: [
                     {
                        model: models.Product_Color,
                        as: "color_data",
                        attributes: ["color", "color_ascii"],
                     },
                     {
                        model: models.Product_Storage,
                        as: "storage_data",
                        attributes: ["storage", "storage_ascii"],
                     },
                  ],
               },
            ],
         });
         res.json(product);
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
