module.exports = function paginationMiddleware(req, res, next) {
   req._page = {
      curPage: 1,
      pageSize: 3,
   };

   if (req.query.hasOwnProperty("_page")) {
      Object.assign(req._page, {
         curPage: parseInt(req.query._page) > 1 ? parseInt(req.query._page) : 1,
      });
   }

   next();
};
