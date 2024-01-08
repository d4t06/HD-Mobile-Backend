const { Op, Sequelize } = require("sequelize");
const { generateId } = require("../utils/appHelper");
const models = require("../models");

const PAGE_SIZE = +process.env.PAGE_SIZE || 6;

class SearchController {
   async search(req, res) {
      const { q, page = 1, brand_id = [] } = req.query;
      if (!q.trim()) return res.status(500).json("missing query");

      const { enable, type, column } = res.locals.sort;
      let order = [];
      let where = {
         product_name_ascii: {
            [Op.like]: `${generateId(q)}%`,
         },
      };
      if (brand_id.length) where["brand_id"] = brand_id;

      if (enable) {
         if (column === "installment") {
            where["installment"] = 1;
         } else {
            order = [[{ model: models.Product_Combine, as: "combines_data" }, column, type]];
         }
      }

      console.log("check q", q, enable);

      try {
         const { rows, count } = await models.Product.findAndCountAll({
            offset: (+page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            include: [
               {
                  model: models.Product_Combine,
                  where: { default: true },
                  as: "combines_data",
               },
               {
                  model: models.Category,
                  as: 'category_data'
               }
            ],
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
            where,
            order,
         });

         let variants_data = [];
         const productIds = rows.map((p) => p.product_name_ascii) || [];

         if (productIds) {
            variants_data = await models.Product_Storage.findAll({
               where: { product_name_ascii: { [Sequelize.Op.in]: productIds } },
            });
         }

         return res.json({
            brand_id,
            order: enable ? [column, type] : [],
            page_size: PAGE_SIZE,
            page,
            count,
            products: rows,
            variants_data,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json("loi server");
      }
   }
}

module.exports = new SearchController();
