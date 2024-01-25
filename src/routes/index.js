// router
const appRouter = require("./app");
const userRouter = require("./user");
const productsRouter = require("./products");
const cartRouter = require("./cart");
const searchRouter = require("./search");
const authRouter = require("./auth");
const reviewRouter = require("./review");
const commentRouter = require("./comment");
const refreshRouter = require("./refresh");
const manageSlider = require("./manageSlider");
const manageProductRouter = require("./manageProduct");
const manageCommentRouter = require("./manageComment");
const manageReviewRouter = require("./manageReview");
const manageCategoryRouter = require("./manageCategory");
const manageImageRouter = require("./manageImage");

const tokenMiddleware = require("../middleWares/tokenMiddleware");
const roleMiddleware = require("../middleWares/roleMiddleware");

const route = function (app) {
  app.use("/api/app", appRouter);

  app.use("/api/auth", authRouter);

  app.use("/api/refresh", refreshRouter);

  app.use("/api/products", productsRouter);

  app.use("/api/carts", cartRouter);

  app.use("/api/search", searchRouter);

  app.use("/api/product-comments", commentRouter);

  app.use("/api/product-reviews", reviewRouter);

  app.use(tokenMiddleware);
  app.use(roleMiddleware.isAdmin);

  app.use("/api/category-management", manageCategoryRouter);

  app.use("/api/slider-management", manageSlider);

  app.use("/api/product-management", manageProductRouter);

  app.use("/api/product-comment-management", manageCommentRouter);

  app.use("/api/image-management", manageImageRouter);

  app.use("/api/users", userRouter);

  app.use("/api/product-review-management", manageReviewRouter);

  app.use("/", (res, req) => {
    req.status(404).json("Resource not found");
  });
};

module.exports = route;
