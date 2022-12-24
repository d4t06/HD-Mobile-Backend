const pool = require("../../config/db");

class CoursesController {
  index(req, res) {
    let html = "<h1>Header</h1>";
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected as id" + connection.threadId);
      //query(sql string, callback)
      connection.query("SELECT * from packages", (err, rows) => {
        connection.release();
        // rows.map((item) => {
        //   html += `<h1>${item.name} - ${item.price}</h1> <a href="/course/${item.id}" style="font-size: 2rem;">click</a>`;
        // });
        // neu khong co loi thi gui du lieu cho client
        if (!err) res.render("course", { rows });
        else console.log(err);
      });
    });
  }
  show(req, res) {
    let html = "<h1>Header</h1>";
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected as id" + connection.threadId);
      //query(sql string, callback)
      connection.query(
        "SELECT * from packages WHERE id = ?",
        [req.params.slug],
        (err, rows) => {
          connection.release();
          rows.map((item) => {
            html += `<h1>${item.name} - ${item.price}</h1>`;
          });
          // neu khong co loi thi gui du lieu cho client
          if (!err) res.send(html);
          else console.log(err);
        }
      );
    });
  }
  create(req, res) {
    res.send("<h1>create</h1> <input type=text/> <input/>");
  }
}

module.exports = new CoursesController();
