module.exports = function sortMiddleware(req, res, next) {
   res.locals.sort = {
      enable: false,
      column: "",
      type: "desc",
   };

   // eliminate
   const { column, type = "desc", ...rest } = req.query;
   req.query = rest;

   if (column && type) {
      console.log("sort middleware pass");

      const isValidType = ["asc", "desc"].includes(type);
      const isValidColumn = ["price", "installment"].includes(column);

      Object.assign(res.locals.sort, {
         enable: isValidColumn && isValidType ? true : false,
         type,
         column,
      });
   } else {
      // không cần else ở đay bì, mỗi một request sẽ có res.locals.sort mới
   }

   next();
};
