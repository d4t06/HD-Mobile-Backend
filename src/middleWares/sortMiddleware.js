module.exports = function sortMiddleware(req, res, next) {
   res.locals.sort = {
      order: ''
   }

   if (req.query.hasOwnProperty("column")) {
      // ở client đã fix, nếu sort theo phổ biến nhất thì không có column và type
      console.log("sortMiddleware pass")
      // neu co truyen len gia tri
      if (req.query.column) {
         const isValidType = ['asc', 'desc'].includes(req.query.type)
         const isValidColumn = ['cur_price', "intallment"].includes(req.query.column)

         const column = isValidColumn ? req.query.column : 'name'
         const type = isValidType ? req.query.type : 'desc'

         Object.assign(res.locals.sort, {
            order: [[column, type]]
         });
      }
   }
   const { column, type, ...rest } = req.query;
   req.query = rest
   next()
}