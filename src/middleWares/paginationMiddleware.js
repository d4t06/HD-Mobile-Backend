module.exports = function paginationMiddleware(req, res, next) {
   req._page = {
      curPage: 1,
      pageSize: 5,
   };

   if (req.query.hasOwnProperty("page")) {
      Object.assign(req._page, {
         curPage: parseInt(req.query.page)
      });
   }

   next();
};