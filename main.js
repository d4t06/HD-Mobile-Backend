const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const route = require("./src/routes");
const methodOverride = require("method-override");
const cookiesParser = require("cookie-parser");
const corsOptions = require("./src/config/corsOption");

// cross origin resource sharing
app.use(cors(corsOptions));

// middleware for cookie
app.use(cookiesParser());

// connect database
require("./connectDB");

// built-in middleware for json
app.use(express.json());

// built-in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: false }));

// for put, delete method
app.use(methodOverride("_method"));

//Routes
route(app);

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
