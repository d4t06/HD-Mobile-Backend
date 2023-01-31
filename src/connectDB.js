const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("hd_shop_dev", "root", "", {
   host: "localhost",
   dialect: "mysql",
   logging: false,
   define: {
      freezeTableName: true,
   },
});

const Product = sequelize.define("Product", {
   name: {
      type: DataTypes.STRING,
   },
   image: {
      type: DataTypes.STRING,
   },
   old_price: {
      type: DataTypes.NUMBER,
   },
   cur_price: {
      type: DataTypes.NUMBER,
   },
});

module.exports = (async () => {
   try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
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
