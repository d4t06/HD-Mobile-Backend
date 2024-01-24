const models = require("../models");

const PAGE_SIZE = +process.env.PAGE_SIZE || 6;

const errorRes = (res, msg) => {
   res.status(402).json({ status: "finish", message: msg || "missing payload" });
};

class ProductController {
   async getAll(req, res) {
      const { page = 1, price, brand_id, category_id } = req.query;

      console.log("check params", req.params);
      console.log("check query", req.query);

      // const { enable, type, column } = res.locals.sort;
      // let order = [];
      const where = {};

      if (Number.isInteger(+category_id)) {
         where["category_id"] = +category_id;
      }

      if (brand_id && brand_id.length) {
         where["brand_id"] = brand_id;
      }

      // if (enable) {
      //    if (column === "installment") {
      //       where["installment"] = 1;
      //    } else {
      //       order = [[{ model: models.Product_Storage, as: "variants_data" }, column, type]];
      //    }
      // }

      // console.log(">>>check where, ", where);
      // console.log(">>>check order, ", order);

      try {
         const { rows, count } = await models.Product.findAndCountAll({
            offset: (+page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            distinct: true,
            include: [
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
            where,
            order: [["createdAt", "DESC"]],
            // attributes: {
            //    exclude: ["createdAt", "updatedAt"],
            // },
         });

         return res.json({
            brand_id,
            category_id,
            price: "",
            // order: [column, type],
            page_size: PAGE_SIZE,
            count,
            products: rows,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: "product controller error" });
      }
   }

   async addOne(req, res) {
      try {
         if (!req.body) {
            return errorRes(res);
         }

         const productInfo = req.body;

         // check info
         if (!productInfo.brand_id || !productInfo.category_id)
            return res.status(402).json({ status: "finish", message: "missing payload" });

         const newProduct = await models.Product.create({ ...productInfo });

         res.status(201).json({
            status: "successful",
            message: "update product successful",
            data: newProduct,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "fail",
            message: "insert error",
         });
      }
   }

   async updateOne(req, res) {
      try {
         if (!req.body) {
            return errorRes(res);
         }

         const productInfo = req.body;
         if (!productInfo.id || !productInfo.category_id || !productInfo.brand_id) return errorRes(res);

         await models.Product.update({ ...productInfo }, { where: { id: productInfo.id } });

         res.status(201).json({
            status: "successful",
            message: "update product successful",
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "update product fail",
         });
      }
   }

   async deleteOne(req, res) {
      try {
         const { id } = req.params;

         await models.Product.destroy({ where: { id: id } });

         res.status(201).json({
            status: "successful",
            message: "delete product successful",
         });
      } catch (error) {
         console.log(error);
         res.status(501).json({ status: "fail", message: error });
      }
   }

   async addManyAttribute(req, res) {
      try {
         if (!req.body) {
            return missPayloadError(res);
         }

         const data = req.body;

         data.forEach((item) => {
            if (!item.category_attr_id || !item.product_name_ascii || !item.value) {
               return missPayloadError(res, "product attribute data error");
            }
         });

          await models.Product_Attribute.bulkCreate(data);

         res.status(201).json({status: "successful", message: 'add product attributes successful'});
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "add product datas error",
         });
      }
   }

   async updateOneAttribute(req, res) {
      try {

         if (!req.body) {
            return missPayloadError(res);
         }

         const data = req.body
         const {id} = req.params

         if (id === undefined)
            return missPayloadError(res, "product attribute data error");

         const newProductSlider = await models.Product_Attribute.update(data, {where: {id}});

         res.status(201).json({
            status: "successful",
            message: "update product attribute successful",
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "update product attribute error",
         });
      }
   }
}

module.exports = new ProductController();
