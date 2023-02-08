class roleMiddleware {
   isAdmin(req, res, next) {
      console.log("role middleware passed");
      const { role_code } = req.userInfo;
      if (role_code !== "R1") return res.json("require admin role");
      next();
   }
   isDeveloper(req, res, next) {
      console.log("role middleware passed");

      const { role_code } = req.userInfo;
      if (role_code !== "R1" && role_code !== "R2")
         return res.json("require developer role or higher");
      next();
   }
}
module.exports = new roleMiddleware();
