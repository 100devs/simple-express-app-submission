const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const figlet = require("figlet");
const angrySongs = require("./songs/angrySongs.js");
const chillSongs = require("./songs/chillSongs.js");
const happySongs = require("./songs/happySongs.js");
const sadSongs = require("./songs/sadSongs.js");
const loveSongs = require("./songs/loveSongs.js");

const PORT = process.env.PORT || 8000;
const server = http.createServer((req, res) => {
     const page = url.parse(req.url).pathname;
     // const params = querystring.parse(url.parse(req.url).query);
     console.log(page);

     const readWrite = (file, contentType) => {
          fs.readFile(file, function (err, data) {
               res.writeHead(200, { "Content-Type": contentType });
               res.write(data);
               res.end();
          });
     };

     switch (page) {
          case "/":
               readWrite("index.html", "text/html");
               break;
          case "/api/angry":
               res.end(JSON.stringify(angrySongs.angrySongsObj.angrySongs));
               break;
          case "/api/happy":
               res.end(JSON.stringify(happySongs.happySongsObj.happySongs));
               break;
          case "/api/sad":
               res.end(JSON.stringify(sadSongs.sadSongsObj.sadSongs));
               break;
          case "/api/inLove":
               res.end(JSON.stringify(loveSongs.loveSongsObj.loveSongs));
               break;
          case "/api/chill":
               res.end(JSON.stringify(chillSongs.chillSongsObj.chillSongs));
               break;
          case "/css/styles.css":
               fs.readFile("css/styles.css", function (err, data) {
                    res.write(data);
                    res.end();
               });
               break;
          case "/js/main.js":
               readWrite("js/main.js", "text/javascript");
               break;
          default:
               figlet("404!!", function (err, data) {
                    if (err) {
                         console.log("Something went wrong...");
                         console.dir(err);
                         return;
                    }
                    res.write(data);
                    res.end();
               });
               break;
     }
});

server.listen(PORT);
