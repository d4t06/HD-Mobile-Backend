// router
const userRouter = require("./user");
const productsRouter = require("./products");
const searchRouter = require("./search");
const authRouter = require("./auth");
const refreshRouter = require("./refresh");
const manageProductRouter = require("./manageProduct");
const manageStorageRouter = require("./manageStorage");
const manageColorRouter = require("./manageColor");
const manageCombineRouter = require("./manageCombine");
const manageSlider = require("./manageSlider");
const slider = require("./slider");
const manageAttributeRouter = require("./manageAttribute");
const manageDetailRouter = require("./manageDetail");
const manageCommentRouter = require("./manageComment");
const commentRouter = require("./comment");
const reviewRouter = require("./review");
const manageReviewRouter = require("./manageReview");
const appRouter = require("./app");
const manageImageRouter = require("./manageImage");
const tokenMiddleware = require("../middleWares/tokenMiddleware");
const roleMiddleware = require("../middleWares/roleMiddleware");

const route = function (app) {
   app.use("/api/app", appRouter);

   app.use("/api/auth", authRouter);

   app.use("/api/refresh", refreshRouter);

   app.use("/api/products", productsRouter);

   app.use("/api/search", searchRouter);

   app.use("/api/product-comments", commentRouter);

   app.use("/api/product-reviews", reviewRouter);

   app.use("/api/slider", slider);

   app.use(tokenMiddleware);
   app.use(roleMiddleware.isAdmin);

   app.use("/api/slider-management", manageSlider);

   app.use("/api/product-management", manageProductRouter);

   app.use("/api/product-comment-management", manageCommentRouter);

   app.use("/api/image-management", manageImageRouter);

   app.use("/api/users", userRouter);

   app.use("/api/storage-management", manageStorageRouter);

   app.use("/api/color-management", manageColorRouter);

   app.use("/api/combine-management", manageCombineRouter);

   app.use("/api/product-attribute-management", manageAttributeRouter);

   app.use("/api/product-detail-management", manageDetailRouter);

   app.use("/api/product-review-management", manageReviewRouter);

   app.use("/", (res, req) => {
      req.status(404).json("Resource not found");
   });
};

module.exports = route;
