const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {

   console.log("token middleware passed");
   if (!req.headers.authorization) return res.sendStatus(403); // forbidden
   
   // bearer blabla
   const token = req.headers.authorization.split(" ")[1];

   try {
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {

         console.log('decode = ', decode)
         if (err) return res.status(403).json("token expired");
         req.userInfo = decode; //id, username, role_code

         next();
      });

   } catch (error) {
      res.sendStatus(403); // forbidden
   }
};
