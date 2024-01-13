// router
const userRouter = require("./user");
const productsRouter = require("./products");
const searchRouter = require("./search");
const authRouter = require("./auth");
const refreshRouter = require("./refresh");
const cudProductRouter = require("./cudProduct");
const cudStorageRouter = require("./cudStorage");
const cudColorRouter = require("./cudColor");
const cudCombineRouter = require("./cudCombine");
const cudSliderRouter = require("./cudSlider");
const productAttributeRouter = require('./productAttribute')
const productDetailRouter = require('./productDetail')

const appRouter = require("./app");
const imageRouter = require("./image");
// controller
// const insertController = require("../controllers/InsertController");
// middleware
const tokenMiddleware = require("../middleWares/tokenMiddleware");
const roleMiddleware = require("../middleWares/roleMiddleware");

const route = function (app) {
   app.use("/api/app", appRouter);

   app.use("/api/auth", authRouter);

   app.use("/api/refresh", refreshRouter);

   app.use("/api/products", productsRouter);

   app.use("/api/search", searchRouter);

   app.use("/api/slider-management", cudSliderRouter);

   app.use("/api/product-management", cudProductRouter);

   app.use(tokenMiddleware);
   app.use(roleMiddleware.isAdmin);

   app.use("/api/image-management", imageRouter);

   app.use("/api/users", userRouter);

   app.use("/api/storage-management", cudStorageRouter);

   app.use("/api/color-management", cudColorRouter);

   app.use("/api/combine-management", cudCombineRouter);

   app.use('/api/product-attribute-management', productAttributeRouter)

   app.use('/api/product-detail-management', productDetailRouter)

   app.use("/", (res, req) => {
      req.status(404).json("Resource not found");
   });
};

module.exports = route;
