const jwt = require("jsonwebtoken");
module.exports = {
    verifyToken: function (req, res, next) {
        if (!req.headers.authorization) {
          return res.status(404).json({response:"Unathorized Request"});
        }
  
        const token = req.headers.authorization.split(" ")[1];
        if (token == "null") {
          return res.status(404).json({response:"Unathorized Request"});
        }
        const payload = jwt.verify(token, "secretkey");
        req.userId = payload._id;
        next();
      }
}

