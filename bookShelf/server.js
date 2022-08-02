"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;
var dotenv = require("dotenv");
dotenv.config();
var connectionString = "mongodb+srv://".concat(process.env.USER, ":").concat(process.env.PW, "@cluster0.ajgf3.mongodb.net/?retryWrites=true&w=majority");
MongoClient.connect(connectionString, function (err, client) {
    console.log("Connected to database");
    var db = client.db("bookshelf");
    var bookCollection = db.collection("books");
    // middleware
    app.set("view engine", "ejs");
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static("public"));
    app.use(trafficLog);
    // basic rendering of site with dataset
    app.get("/", function (req, res) {
        var cursor = db
            .collection("books")
            .find()
            .sort({ title: 1 })
            .toArray()
            .then(function (results) {
            res.render("index.ejs", { books: results, manage: false });
        })["catch"](function (error) { return console.error(error); });
    });
    // management console for
    app.get("/manage", function (req, res) {
        var cursor = db
            .collection("books")
            .find()
            .sort({ title: 1 })
            .toArray()
            .then(function (results) {
            res.render("index.ejs", { books: results, manage: true });
        })["catch"](function (error) { return console.error(error); });
    });
    app.post("/book-input-new", function (req, res) {
        bookCollection.insertOne(req.body).then(function (result) {
            res.redirect("/manage");
        });
    });
    app.put("/book-input-list", function (req, res) {
        console.log(req.body);
        bookCollection
            .findOneAndUpdate({ title: req.body.title }, {
            $set: req.body
        }, {
            upsert: true
        })
            .then(function (result) {
            res.json("Success");
        })["catch"](function (error) { return console.error(error); });
    });
    app["delete"]("/book-input-remove", function (req, res) {
        console.log(req.body);
        bookCollection
            .deleteOne({ title: req.body.title })
            .then(function (result) {
            if (result.deletedCount === 0) {
                return res.json("No title deleted");
            }
            res.json("Deleted title: ".concat(req.body.title));
        })["catch"](function (error) { return console.error(error); });
    });
    app.listen(process.env.PORT, function () {
        console.log("listening on ".concat(process.env.PORT));
    });
});
// logging middleware to make requests plain
var trafficLog = function (req, res, next) {
    if (Object.keys(req.body).length !== 0) {
        console.log(req.method, req.body);
    }
    next();
};
