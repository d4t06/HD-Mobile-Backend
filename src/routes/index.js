// const Connection = require("mysql2/typings/mysql/lib/Connection");
const newsRouter = require("./news");
const siteRouter = require("./site");
const courseRouter = require("./course");

const route = function (app) {
  app.use("/news", newsRouter);

  app.use("/course", courseRouter);

  app.get("/", siteRouter);
};

module.exports = route;
