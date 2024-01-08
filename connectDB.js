// const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
let sequelize;

if (process.env.NODE_ENV === "production") {
   sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host: process.env.DB_HOST,
      dialect: "mysql",
      port: process.env.DB_PORT,
      logging: false,
   });
} else if (process.env.NODE_ENV === "development") {
   sequelize = new Sequelize("hd_shop_dev", "root", "", {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
      logging: false,
   });
}

module.exports = (async () => {
   try {
      await sequelize.authenticate();
      console.log("Connected to db");
   } catch (error) {
      console.error("Unable to connect to the database:", error);
   }
})();

// connectDatabase()

// const pool = mysql.createPool({
//   connectionLimit: "10",
//   user: "root",
//   database: "mydb",
//   host: process.env.DB_HOST,
//   password: "",
// });

// module.exports = connectDatabase();
