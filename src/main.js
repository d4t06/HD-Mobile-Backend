const express = require("express");
const route = require("./routes");
const app = express();
const handlebars = require("express-handlebars");
const path = require("path");
const port = 3000;

const hbs = handlebars.create({
  defaultLayout: "main",
  extname: ".hbs",
  layoutsDir: "src/resources/views/layouts",
  partialsDir: "src/resources/views/partials",
});

const viewsPath = path.join(__dirname, "/resources/views");
app.use(express.static(path.join(__dirname, "public")));

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", viewsPath);

// app.delete("/course/:id", (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log("connected as id" + connection.threadId);
//     //query(sql string, callback)
//     connection.query(
//       "DELETE from beers WHERE id = ?",
//       [req.params.id],
//       (err, rows) => {
//         connection.release();

//         if (!err)
//           res.send(
//             "beer with the record id: " + [req.params.id] + "has been removed"
//           );
//         else console.log(err);
//       }
//     );
//   });
// });

// app.post("/db", (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log("connected as id" + connection.threadId);

//     const params = req.body;
//     console.log(params);
//     //query(sql string, callback)
//     connection.query("INSERT INTO packages SET ?", params, (err, rows) => {
//       connection.release();

//       if (!err)
//         res.send("item with the record name " + params.name + "has been added");
//       else console.log(err);
//     });
//   });
// });

//Routes
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
