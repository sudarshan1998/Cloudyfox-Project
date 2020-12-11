require("../connection.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;


const Account = db.sequelize.define("account", {
  username: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        args: true,
        msg: "'Username' field is required"
      },
      notEmpty: {
        args: true,
        msg: "'Username' field cannot be empty"
      }
    }
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: "'Password' field is required"
      },
      notEmpty: {
        args: true,
        msg: "'Password' field cannot be empty"
      },
      length: (value) => {
        if(value.length < 8) throw new Error("Password must be minimum of 8 characters");
      }
    }
  }
});


Account.beforeCreate((obj,  options) => {
  return bcrypt.hash(obj.password,  saltRounds)
    .then(hashedPassword => {
      obj.password = hashedPassword;
    })
    .catch(err => console.log(err));
});


Account.beforeUpdate((obj,  options) => {
  return bcrypt.hash(obj.password,  saltRounds)
    .then(hashedPassword => {
      obj.password = hashedPassword;
    })
    .catch(err => console.log(err));
});


module.exports.Account = Account;