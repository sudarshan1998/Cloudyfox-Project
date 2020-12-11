const Sequelize = require("sequelize");
const sequelize = new Sequelize("cloudy", "root", "", {
  dialect: "mysql"
});
db = {};


sequelize
  .authenticate()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;
