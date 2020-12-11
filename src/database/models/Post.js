require("../connection.js");


const Post = db.sequelize.define("post", {
	title: {
		type: db.Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: {
				args: true,
				msg: "'title' field is required"
			},
			notEmpty: {
				args: true,
				msg: "'title field cannot be empty'"
			}
		}
	}
});


module.exports.Post = Post;