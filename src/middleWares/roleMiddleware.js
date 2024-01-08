class roleMiddleware {
   isAdmin(req, res, next) {
      const { role } = req.userInfo;
      console.log("role middleware check role =", role);
      if (role !== "ADMIN") return res.json("require admin role");
      next();
   }
   isDeveloper(req, res, next) {
      const { role } = req.userInfo;
      console.log("role middleware check role = ", role);

      if (role !== "ADMIN" && role !== "DEVELOPER") return res.json("require developer role or higher");
      next();
   }
}
module.exports = new roleMiddleware();
