const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const route = require("./src/routes");
const methodOverride = require("method-override");

// use cors
app.use(cors());

// connect database
require("./connectDB");

// use json data type
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// for put, delete method
app.use(methodOverride("_method"));

//Routes
route(app);

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
