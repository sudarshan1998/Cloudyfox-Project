const fs = require("fs");
const path = require("path");
models = {};


let files = fs.readdirSync(path.join(__dirname, "./models"));


for(let file of files){
  let obj = require("./models/" + file);
  for(let key in obj) {
    models[key] = obj[key];
  }
}
