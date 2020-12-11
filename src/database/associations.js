require("./models.js");

//relation between comment and post. Here comment_id is foreign key in posts table
models.Comment.hasMany(models.Post, {onDelete: "cascade"});
models.Post.belongsTo(models.Comment);


module.exports.find = (model) => {

  for(let key in model["associations"]) {
    for(let func in model["associations"][key]["accessors"]) {
      console.log(model["associations"][key]["accessors"][func]);
    }
  }

}