// const pool = require("../../config/db");
const db = require("../models/index");
const testdata = require ('../../testdata.js')

class ProductsController {
   index(req, res) {
      // const query = req.query;
      const {page, ...query} = req.query
      console.log(query, page)
      // return res.json(testdata)
      // const curPage = req._page ? req._page.curPage : 1;
      const pageSize = req._page ? req._page.pageSize : 5;

      // thực hiện tiềm kiếm
      db.Product.findAndCountAll({
            offset: 0,
            limit: 6 * (+page),
            where: {
               ...query
            },
            raw: true,
         })
         .then((data) => {
            return res.json(data);
         })
         .catch((err) => {
            console.log(err);
            res.status(500).json("loi server");
         });
   }
   async getProducts(req, res) {
      const params = req.params;
      // const searchKey = key.split("-").length > 1 ? 'href' : "brand";
      // const categories = {
      //    dtdd: "mobile",
      //    laptop: "laptop"
      // }

      console.log(params)
      return res.status(200).json({rows: {"href": "samsung-galaxy-s23-ultra",
      "brand": "Samsung",
      "name": "Samsung Galaxy S23 Ultra 5G",
      "category": "mobile",
      "quantity": 10,
      "image": "https://cdn.tgdd.vn/Products/Images/42/249948/samsung-galaxy-s23-ultra-1-600x600.jpg",
      "feature": "6.8\"&Quad HD+ (2K+)&",
      "old_price": null,
      "cur_price": "31990000",
      "product_label": "https://cdn.tgdd.vn/ValueIcons/label-moi-ra-mat-fnal.png",
      "intallment": false,
      "label": false,
      "gift": "Giảm 5 triệu, Trả góp 0%, Thu cũ tài trợ 3 triệu, Ốp lưng BTS",
      "pre_order": "Đặt trước đến 17/02"},
      count: 1
   })

      if (searchKey == 'brand') { // if find by brand dtdd/samsung 
         try {
            const curPage = req._page ? req._page.curPage : 1;
            const pageSize = req._page ? req._page.pageSize : 5;

            const products = await db.Product.findAndCountAll({
               offset: 0,
               limit: pageSize * curPage,
               where: {
                  category: categories[category],
                  brand: [key],
               },
               raw:  true,
            })
            res.json(products)
            // if (products) 
            //    else res.json("khong tim thay")
         } catch {
            res.json("loi server")
         }
      } else try { // if get one by href dtdd/samsung-galaxy-s22
         const product = await db.Product.findAll({
            where: {
               href: key
            },
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
            include: [{
               model: db.Detail,
               as: "data",
               attributes: {
                  exclude: ["createdAt", "updatedAt"],
               },
            }, ],
         });
         if (product) res.json(product);
         else res.json("product not found");
      } catch (error) {
         console.log(error);
         res.json("loi server");
      }
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