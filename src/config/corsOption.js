const whiteList = [process.env.WHITE_LIST ?? '', "https://d4t06.github.io"];

console.log('check white list', whiteList);

const corsOptions = {
   credentials: true,
   // cb(error, options) params
   origin: (origin, cb) => {
      // console.log("check origin", origin, whiteList);
      if (whiteList.indexOf(origin) !== -1 || !origin) cb(null, true);
      else cb("[error]: Not allowed by cors");
   },
   optionsSuccessStatus: 200,
};

module.exports = corsOptions;
