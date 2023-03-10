const insertController = require("../controllers/InsertController");

const route = function (app) {
   app.get("/insert", insertController.index);
};

// module.exports = route
