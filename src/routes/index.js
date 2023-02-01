// router
const userRouter = require("./user");
const productsRouter = require("./products");
// controller
const loginController = require("../controllers/LoginController");
// middleware
const tokenMiddleware = require("../middleWares/tokenMiddleware");
const route = function (app) {
   // public route
   app.post("/login", loginController.handleLogin);

   app.post("/register", loginController.handleRegister);

   app.use("/product-management", productsRouter);

   // private route
   app.use(tokenMiddleware);

   app.use("/user-management", userRouter);
};

module.exports = route;
