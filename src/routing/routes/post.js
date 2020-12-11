require("../../database/associations");
const router = require("express").Router();
const bodyParser = require('body-parser');
const verify = require("../../tools/verify.js");
const urlencodedParser = bodyParser.urlencoded({extended: false});

//route to add the post to the posts table
router.route("/addPost")
  .post(verify.all, urlencodedParser, (req, res) => { 				//allows only the logged in user to add the post
    models.Post.create(req.body)
      .then(obj => res.json({status: true}))
      .catch(err => res.json({status: false, error: err}));
  });

//route to upate the post through id passed
router.route("/update/post/:id")
	.put(verify.all, urlencodedParser, (req, res) => { 					//allows only loggein user to update the post
	  models.Post.findByPk(req.params.id) 											//find the post from the given id and return obj
	    .then((obj) => {
	      req.body.title = obj.title;
	      obj.update(req.body);
	    })  
	    .then((obj) => {res.json({status: true, value: obj});
	    })
	    .catch(err => res.json({status: false, error: err}));    
	});

//deletes the post through passed id
router.route("/post/delete/:id")
	.delete(verify.all, urlencodedParser, (req, res) => {     	//allows only loggedin user to delete the post
		models.Post.findByPk(req.params.id)                    		//find the required id obj to delete 
		.then((obj) => {
			obj.destroy();
		})
		.then((obj) => {res.json({status: true, msg: "deleted"})
		})
		.catch(err => res.json({status: false, error: err}));
	});


//route to return all the posts. 
router.route("/allPost")
	.get(verify.all, urlencodedParser, (req, res) => {
		models.Post.findAll()
		.then(objs => res.json({status: true, values: objs}))
		.catch(err => res.json({status: true, values: objs}))
	});


module.exports = router;