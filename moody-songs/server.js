const express = require("express");
const cors = require("cors");
const path = require("path");
const angrySongs = require("./songs/angrySongs.js");
const chillSongs = require("./songs/chillSongs.js");
const happySongs = require("./songs/happySongs.js");
const sadSongs = require("./songs/sadSongs.js");
const loveSongs = require("./songs/loveSongs.js");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
     res.sendFile(path.join(__dirname + "/index.html"));
});
app.get("/api/angry", (req, res) => {
     res.json(angrySongs.angrySongsObj.angrySongs);
});
app.get("/api/happy", (req, res) => {
     res.json(happySongs.happySongsObj.happySongs);
});
app.get("/api/sad", (req, res) => {
     res.json(sadSongs.sadSongsObj.sadSongs);
});
app.get("/api/inLove", (req, res) => {
     res.json(loveSongs.loveSongsObj.loveSongs);
});
app.get("/api/chill", (req, res) => {
     res.json(chillSongs.chillSongsObj.chillSongs);
});

app.listen(PORT, () => console.log("server running"));
