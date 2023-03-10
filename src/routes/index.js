// router
const userRouter = require("./user");
const productsRouter = require("./products");
// controller
const loginController = require("../controllers/LoginController");
const insertController = require("../controllers/InsertController");
// middleware
const tokenMiddleware = require("../middleWares/tokenMiddleware");
const roleMiddleware = require("../middleWares/roleMiddleware");

const route = function (app) {
   // public route
   app.post("/login", loginController.handleLogin);

   app.post("/register", loginController.handleRegister);

   app.get("/insert", insertController.index);

   app.use("/api", productsRouter);

   app.use("/", (res, req) => {
      req.json("Resource not found");
   });
   // private route
   // app.use(tokenMiddleware);
   // app.use(roleMiddleware.isAdmin);
   // app.use("/user" ,userRouter);
};

module.exports = route;
