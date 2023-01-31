const paginationMiddleware = require("../middleWares/paginationMiddleware");
// const loginRouter = require("./login");
const productsRouter = require("./products");
const loginController = require("../controllers/LoginController");

const route = function (app) {
   app.post("/login", loginController.handleLogin);

   app.post("/register", loginController.handleRegister);

   app.use("/products", paginationMiddleware, productsRouter);
};

module.exports = route;
