module.exports = function filterMiddleware (req, res, next) {
	req._fillter = {
		// enable: false,
		brand: '',
		cur_price: '',
	}

	if (req.query.hasOwnProperty("_filter")) {
      // console.log(req.query)
      Object.assign(req._fillter, {
         // enable: true,
         brand: req.query.brand.split(',')
      });
   }
   next()
}