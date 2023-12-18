// const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("hd_shop_dev", "root", "", {
   host: "localhost",
   dialect: "mysql",
   logging: false,
   // define: {
   //    freezeTableName: true,
   // },
});

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
