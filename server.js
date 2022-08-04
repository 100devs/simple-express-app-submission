const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const PORT = 8000;
require("dotenv").config();

//Connection URI
const uri = process.env.DB_STRING;

//Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
	try {
		// Connect the client to the server (optional starting in v4.7)
		await client.connect();
		// Establish and verify connection
		await client.db("admin").command({ ping: 1 });
		console.log("Connected successfully to server");
	} catch (err) {
		console.log(err);
	}
}
run().catch(console.dir);

let dbName = "ToDoList";
let db = client.db(dbName);
console.log(`Connected to ${dbName} Database`);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Post - Create
app.post("/addTask", async (req, res) => {
	try {
		const result = await db.collection("toDoList").insertOne({
			taskName: req.body.taskName,
			priority: Number(req.body.taskPriority),
		});
		console.log("Task Added");
		res.redirect("/");
	} catch (err) {
		console.log(err);
	}
});

//Get - Read
app.get("/", async (req, res) => {
	try {
		const data = await db
			.collection("toDoList")
			.find()
			.sort({ priority: -1 })
			.toArray();
		res.render(`index.ejs`, { list: data });
	} catch (err) {
		console.log(err);
	}
});

//Put - Update
app.put("/increasePriority", async (req, res) => {
	console.log(req.body);
	try {
		const result = await db.collection("toDoList").updateOne(
			{
				taskName: req.body.taskNamee,
				priority: req.body.taskPriorityy,
			},
			{
				$set: {
					priority: req.body.taskPriorityy + 1,
				},
			},
			{
				sort: { _id: -1 },
			}
		);
		console.log("Prio Increased");
		res.json("Prio Increased");
	} catch (err) {
		console.log(err);
	}
});

app.put("/decreasePriority", async (req, res) => {
	console.log(req.body);
	try {
		const result = await db.collection("toDoList").updateOne(
			{
				taskName: req.body.taskNamee,
				priority: req.body.taskPriorityy,
			},
			{
				$set: {
					priority: req.body.taskPriorityy - 1,
				},
			},
			{
				sort: { _id: -1 },
				upsert: true,
			}
		);
		console.log("Lowered Prio");
		res.json("Prio Reduced");
	} catch (err) {
		console.log(err);
	}
});

//Delete - Delaytay
app.delete("/deleteTask", async (req, res) => {
	const result = await db
		.collection("toDoList")
		.deleteOne({ taskName: req.body.taskNamee });
	console.log("Task Removed...");
	res.json("Task Removed...");
});

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
