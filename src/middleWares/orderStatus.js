module.exports = function sortMiddleware(req, res, next) {
   res.locals.status = "";

   let status = req.body.status || req.query.status;

   if (status) {
      const isValidStatus = [
         "completed",
         "canceled",
         "processing",
         "delivering",
      ].includes(status);

      if (isValidStatus) res.locals.status = status;
   }

   next();
};
