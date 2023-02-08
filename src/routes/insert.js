const insertController = require("../controllers/InsertController");

const route = function (app) {
   app.get("/inser", insertController.index);
};

// module.exports = route
