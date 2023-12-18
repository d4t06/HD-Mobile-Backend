module.exports = function paginationMiddleware(req, res, next) {
   res.locals.page = {
      curPage: 0,
      pageSize: +process.env.PAGE_SIZE || 6,
   };

   if (req.query.hasOwnProperty("page")) {
      if (req.query.page) {
         console.log("pagination middleware");
         Object.assign(res.locals.page, {
            curPage: parseInt(req.query.page),
         });
      }
   }

   next();
};
