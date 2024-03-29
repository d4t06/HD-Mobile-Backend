const { Op, Sequelize } = require("sequelize"); // operation
const models = require("../models");

const PAGE_SIZE = +process.env.PAGE_SIZE || 6;

class ProductsController {
   async getProducts(req, res) {
      const { page = 1, price, brand_id, category_id = 1 } = req.query;

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

      if (brand_id) where["brand_id"] = brand_id;

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
               {
                  model: models.Category,
                  as: "category_data",
               },
            ],
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
            where,
            order,
         });

         let variants_data = [];
         const productIds = rows.map((p) => p.product_ascii) || [];

         if (productIds) {
            variants_data = await models.Product_Storage.findAll({
               where: {
                  product_ascii: { [Sequelize.Op.in]: productIds },
                  base_price: { [Sequelize.Op.not]: 0 },
               },
            });
         }

         return res.json({
            brand_id,
            category_id,
            order: [column, type],
            price,
            page_size: PAGE_SIZE,
            page: +page,
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
         return res.status(404).json({ message: "missing params" });
      }

      try {
         const product = await models.Product.findOne({
            where: {
               product_ascii: id,
            },
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
            include: [
               {
                  model: models.Category,
                  as: "category_data",
                  include: {
                     model: models.Category_Attribute,
                     as: "attributes",
                  },
               },
               {
                  model: models.Product_Detail,
                  as: "detail",
                  attributes: {
                     exclude: ["createdAt", "updatedAt"],
                  },
               },
               {
                  model: models.Product_Storage,
                  as: "storages_data",
                  // where: { base_price: { [Sequelize.Op.not]: 0 } },
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
               {
                  model: models.Product_Attribute,
                  as: "attributes_data",
                  // include: {
                  //    model: models.Category_Attribute,
                  //    as: "attribute_data",
                  // },
               },
            ],
         });

         res.json(product);
      } catch (err) {
         console.log(err);
         res.status(500).json({ message: err });
      }
   }
}

module.exports = new ProductsController();
