const whiteList = ["https://d4t06.github.io", "http://localhost:5173"];

const corsOptions = {
   credentials: true,
   // cb(error, options) params
   origin: (origin, cb) => {
      if (whiteList.indexOf(origin) !== -1 || !origin) cb(null, true);
      else cb("[error]: Not allowed by cors");
   },
   optionsSuccessStatus: 200,
};

module.exports = corsOptions;
