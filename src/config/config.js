require("dotenv").config({ path: `../.env.local`, override: true });

module.exports = {
   development: {
      username: "root",
      password: "",
      database: "hd_shop_dev",
      host: "localhost",
      port: 3306,
      dialect: "mysql",
      dialectModule: require("mysql2"),
      logging: false,
   },
   production: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "mysql",
      dialectModule: require("mysql2"),
      logging: false,
   },
};
