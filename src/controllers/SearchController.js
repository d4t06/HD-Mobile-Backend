const { Op } = require("sequelize");
const { generateId } = require("../utils/appHelper");
const models = require("../models");

class SearchController {
   async search(req, res) {
      const { q } = req.query;
      if (!q.trim()) return res.status(500).json("missing query");

      let where = {
         product_ascii: {
            [Op.like]: `${generateId(q)}%`,
         },
      };

      try {
         const rows = await models.Product.findAll({
            limit: 20,
            include: [
               {
                  model: models.Product_Combine,
                  where: { default: true },
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
         });

         return res.json(rows);
      } catch (error) {
         console.log(error);
         res.status(500).json("loi server");
      }
   }
}

module.exports = new SearchController();
