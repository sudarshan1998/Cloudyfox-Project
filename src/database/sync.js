require("./associations.js");


db.sequelize.sync({force: true})
  .then(() => console.log("tables created"))
  .catch(err => console.log(err));
