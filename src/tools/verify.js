const jwt = require("jsonwebtoken");
const secretKey = "secret";


module.exports.all = (req, res, next) => {
  if(req.headers.auth) {
    let token = req.headers.auth.split(" ")[1]
    jwt.verify(token, secretKey, (err, obj) => {
      if(err) return res.json({error: err});
      if(obj) req.user = obj;
      else return res.json({error: "Access denied"});
      next();
    });
  }
  else return res.json({error: "Access denied"});
}


module.exports.admin = (req, res, next) => {
  if(req.headers.auth) {
    let token = req.headers.auth.split(" ")[1]
    // console.log(token);
    jwt.verify(token, secretKey, (err, obj) => {
      if(err) return res.json({error: err});
      if(obj.role == "admin") req.user = obj;
      else return res.json({error: "Access denied"});
      next();
    });
  }
  else return res.json({error: "Access denied"});
}


module.exports.accountant = (req, res, next) => {
  if(req.headers.auth) {
    let token = req.headers.auth.split(" ")[1]
    // console.log(token);
    jwt.verify(token, secretKey, (err, obj) => {
      if(err) return res.json({error: err});
      if(obj.role == "accountant") req.user = obj;
      else return res.json({error: "Access denied"});
      next();
    });
  }
  else return res.json({error: "Access denied"});
}
