require("../../database/associations");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const secretKey = "secret";
const urlencodedParser = bodyParser.urlencoded({extended: false});

//route to login
router.route("/")
  .post(urlencodedParser, (req, res) => {
    let data = {};
    let user = {};
    models.Account.findOne({where: {userName: req.body.userName}})
      .then(obj => {
        if(obj) {
          user.id = obj.userId;
          user.role = obj.role;
          data.role = obj.role;
          return bcrypt.compare(req.body.password, obj.password);
        }
        else throw("Invalid username or password");
      })
      .then(value => {
        if(value) {
          jwt.sign(user, secretKey, (err, token) => {
            data.token = token;
            res.json({status: true, values: data});
          });
        }
        else throw("Invalid username or password");
      })
      .catch(err => res.json({status: false, error: err}));
  });


  module.exports = router;

