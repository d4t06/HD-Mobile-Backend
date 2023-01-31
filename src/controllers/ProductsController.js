// const pool = require("../../config/db");
const db = require("../models/index");

class ProductsController {
   index(req, res) {
      // res.json(req._page);
      // return;

      const { curPage, pageSize } = req._page;

      // thực hiện tiềm kiếm
      db.Product.findAndCountAll({
         offset: (curPage - 1) * pageSize,
         limit: pageSize,
      })
         .then((data) => {
            return res.json(data);
            const { count, rows } = data;

            const products = [];
            rows.map((item) => products.push(item.dataValues));

            res.render("products", { products: products, count });
         })
         .catch((err) => {
            console.log(err);
            res.status(500).json("loi server");
         });

      // try {
      //    const process = db.User.findAll();
      //    const products = await process;
      //    res.json(products);
      // } catch (error) {
      //    console.log(error);
      //    res.status(500).json("loi server");
      // }
   }
   show(req, res) {
      res.json("show");
   }
   create(req, res) {
      res.render("create");
   }
   async store(req, res) {
      const params = req.body;
      // res.json(params);
      try {
         const process = db.Product.create(params);
         const result = await process;
         if (result) {
            console.log(result);
            res.redirect("/products");
         }
      } catch (error) {
         res.status(500).json("loi server");
      }
   }
   edit(req, res) {}
   update(req, res) {}
   find(req, res) {
      res.json("find");
   }
   delete(req, res) {
      res.json("delete");
   }
}

module.exports = new ProductsController();
