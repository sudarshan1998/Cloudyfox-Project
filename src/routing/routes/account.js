require("../../database/associations");
const router = require("express").Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const verify = require("../../tools/verify.js");


router.route("/addAccount")
  .post((req, res) => {
    models.Account.create(req.body)
      .then(obj => res.json({status: true}))
      .catch(err => res.json({status: false, error: err}));
  });

  
  module.exports = router;