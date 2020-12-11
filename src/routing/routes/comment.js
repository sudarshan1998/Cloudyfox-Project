require("../../database/associations");
const router = require("express").Router();
const bodyParser = require('body-parser');
const verify = require("../../tools/verify.js");
const urlencodedParser = bodyParser.urlencoded({extended: false});


//route to add the comment to the comments table
router.route("/addComment")
  .post(verify.all, urlencodedParser, (req, res) => { 			//allows only the logged in user to add the comment
    models.Comment.create(req.body)
      .then(obj => res.json({status: true}))
      .catch(err => res.json({status: false, error: err}));
  });


//route to upate the post through id passed
router.route("/update/comment/:id")
	.put(verify.all, urlencodedParser, (req, res) => { 	//allows only loggedin user to update the comment
	  models.Comment.findByPk(req.params.id) 						//find the comment from the given id and return obj
	    .then((obj) => {
	      req.body.title = obj.title;
	      obj.update(req.body);
	    })  
	    .then((obj) => {res.json({status: true, value: obj});
	    })
	    .catch(err => res.json({status: false, error: err}));    
	});


//deletes the post through passed id
router.route("/comment/delete/:id")
	.delete(verify.all, urlencodedParser, (req, res) => {     	//allows only loggedin user to delete the comment
		models.Comment.findByPk(req.params.id)                    //find the required id obj to delete 
		.then((obj) => {
			obj.destroy();
		})
		.then((obj) => {res.json({status: true, msg: "deleted"})
		})
		.catch(err => res.json({status: false, error: err}));
	});


  module.exports = router;