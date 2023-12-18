// router
const userRouter = require("./user");
const productsRouter = require("./products");
const authRouter = require("./auth");
const refreshRouter = require("./refresh");
const cudRouter = require("./cud");
const appRouter = require("./app");
const imageRouter = require("./image");
// controller
const insertController = require("../controllers/InsertController");
// middleware
const tokenMiddleware = require("../middleWares/tokenMiddleware");
// const roleMiddleware = require("../middleWares/roleMiddleware");

const route = function (app) {
   app.use("/api/app", appRouter);

   app.use("/api/auth", authRouter);

   app.use("/api/refresh", refreshRouter);

   app.use("/api/products", productsRouter);

   // app.use(tokenMiddleware);
   app.use("/api/images", imageRouter)

   app.use("/api/users", userRouter);

   app.use("/api/product-management", cudRouter);

   app.use("/", (res, req) => {
      req.status(404).json("Resource not found");
   });
};

module.exports = route;
