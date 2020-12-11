require("../connection.js");


const Comment = db.sequelize.define("comment", {
	comment: {
		type: db.Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: {
				args: true,
				msg: "'comment' field cannot be empty"
			},
			notEmpty: {
				args: true,
				msg: "'comment' field cannot be empty"
			}
		}
	}
});


module.exports.Comment = Comment;