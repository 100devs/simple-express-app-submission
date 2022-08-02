let fs = require("fs");

const FILE_NAME = "./repo/users.json";
// let data = fs.readFile("liana.json", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   let character = JSON.parse(data);
//   console.log(character);
// });


let userRepo = {
    get: function(resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if (err){
                reject(err);
            } else {
                // console.log(JSON.parse(data));
                resolve(JSON.parse(data));
            }
        })
    }
}

module.exports = userRepo;
