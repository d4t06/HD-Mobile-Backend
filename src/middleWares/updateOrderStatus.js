module.exports = function sortMiddleware(req, res, next) {
   res.locals.status = "";

   let status = req.body.status || req.query.status;

   if (status) {
      console.log("status middleware pass check status", status);

      const isValidStatus = [
         "completed",
         "canceled",
         "processing",
         "delivering",
      ].includes(status);

      if (isValidStatus) res.locals.status = status;
      else return res.status(402).json("Bad request");
      
   } else return res.status(402).json("Missing status");

   next();
};
