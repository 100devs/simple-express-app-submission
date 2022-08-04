const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;

app.use(cors());

const dinosaurs = {
    "tyrannosaurus rex": {
        name: "Tyrannosaurus Rex",
        period: "Cretaceous",
        height: "20ft",
        length: "40ft",
        weight: "7 tons",
    },
    stegosaurus: {
        name: "Stegosaurus",
        period: "Jurassic",
        height: "9ft",
        length: "30ft",
        weight: "6800lbs",
    },
    triceratops: {
        name: "Triceratops",
        period: "Cretaceous",
        height: "10ft",
        length: "30ft",
        weight: "12 tons",
    },
    dilophosaurus: {
        name: "Dilophosaurus",
        period: "Jurassic",
        height: "5ft",
        length: "20ft",
        weight: "1000lbs",
    },
    velociraptor: {
        name: "Velociraptor",
        period: "Cretaceous",
        height: "3ft",
        length: "6ft",
        weight: "33lbs",
    },
};

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/", (req, res) => {
    res.json(dinosaurs);
});

app.get("/api/:name", (req, res) => {
    const dinosaurName = req.params.name;
    const dinosaur = dinosaurs[dinosaurName];
    if (dinosaur) {
        res.json(dinosaur);
    } else {
        res.status(404).end();
    }
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`listening on port ${PORT}`);
});
