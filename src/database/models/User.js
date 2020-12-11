require("../connection.js");


const User = db.sequelize.define("user", {  
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: "'Name' field is required"
      },
      notEmpty: {
        args: true,
        msg: "'Name' field cannot be empty"
      }
    }
  },
  gender: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: "'Gender' field is required"
      },
      notEmpty: {
        args: true,
        msg: "'Gender' field cannot be empty"
      }
    }
  },
  address: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: "'Address' field is required"
      },
      notEmpty: {
        args: true,
        msg: "'Address' field cannot be empty"
      }
    }
  },
  phone: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        args: true,
        msg: "'Phone' field is required"
      },
      notEmpty: {
        args: true,
        msg: "'Phone' field cannot be empty"
      },
      length: (value) => {
        if(value.length < 10) throw new Error("Phone No. must be of 10 characters");
      }
    }
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        args: true,
        msg: "'Email' field is required"
      },
      notEmpty: {
        args: true,
        msg: "'Email' field cannot be empty"
      },
      isEmail: {
        args: true,
        msg: "Invalid email"
      }
    }
  }
});


User.beforeCreate((obj, options) => {
  obj.uniqueName = obj.name + " | " + obj.phone
  obj.createdDate = Date.now();
  obj.updatedDate = Date.now();
  let date = obj.updatedDate.split("-");
  obj.createdYear = date[0];
  obj.createdMonth = date[1];
  obj.updatedYear = date[0];
  obj.updatedMonth = date[1];
});


User.beforeUpdate((obj, options) => {
  obj.uniqueName = obj.name + " | " + obj.phone;
  obj.updatedDate = Date.now();
  let date = obj.updatedDate.split("-");
  obj.updatedYear = date[0];
  obj.updatedMonth = date[1];
});


module.exports.User = User;