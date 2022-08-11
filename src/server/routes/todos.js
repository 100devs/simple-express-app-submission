"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// External Dependencies
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const mongodb_1 = require("mongodb");
const database_service_1 = require("../../services/database.service");
const todosRouter = (0, express_2.Router)();
(0, database_service_1.connectToDatabase)();
// GET
todosRouter.get("/api/todo", async (_req, res) => {
    try {
        const todos = (await database_service_1.collections?.todos?.find({}).toArray());
        res.status(200).send(todos);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
todosRouter.get("/api/todo/:id", async (req, res) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const todo = (await database_service_1.collections?.todos?.findOne(query));
        if (todo) {
            res.status(200).send(todo);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});
// POST
todosRouter.post("/api/todo/", async (req, res) => {
    //     res.status(200).send('Access to api todo');
    //  const newtodo = req.body as Todo;
    try {
        const newtodo = req.body;
        const result = await database_service_1.collections?.todos?.insertOne(newtodo);
        result
            ? res.status(201).send(`Successfully created a new todo with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new todo.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
// PUT
todosRouter.put("/api/todo/:id", async (req, res) => {
    const id = req?.params?.id;
    try {
        const updatedtodo = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = await database_service_1.collections?.todos?.updateOne(query, { $set: updatedtodo });
        result
            ? res.status(200).send(`Successfully updated task with id ${id}`)
            : res.status(304).send(`task with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
// DELETE
todosRouter.delete("/api/todo/:id", async (req, res) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = await database_service_1.collections?.todos?.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed todo with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove todo with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`todo with id ${id} does not exist`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
// Global Config
todosRouter.use(express_1.default.json());
exports.default = todosRouter;
//# sourceMappingURL=todos.js.map