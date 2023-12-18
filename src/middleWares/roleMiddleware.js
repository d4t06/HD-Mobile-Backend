class roleMiddleware {
   isAdmin(req, res, next) {
      const { role_code } = req.userInfo;
      console.log("role middleware check role =", role_code);
      if (role_code !== "R1") return res.json("require admin role");
      next();
   }
   isDeveloper(req, res, next) {
      const { role_code } = req.userInfo;
      console.log("role middleware check role = ", role_code);

      if (role_code !== "R1" && role_code !== "R2") return res.json("require developer role or higher");
      next();
   }
}
module.exports = new roleMiddleware();
