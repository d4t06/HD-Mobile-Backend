require("dotenv").config({ path: `.env.local`, override: true });

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

const route = require("./src/routes");
const methodOverride = require("method-override");
const cookiesParser = require("cookie-parser");

const corsOptions = require("./src/config/corsOption");
app.use(cors(corsOptions));

// middleware for cookie
app.use(cookiesParser());

// connect database
require("./connectDB");

app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// for put, delete method
app.use(methodOverride("_method"));

//routes
route(app);

app.listen(port, () => {
   console.log(`App listening on port ${port}, env: ${process.env.NODE_ENV}`);
});
