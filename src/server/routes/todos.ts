// External Dependencies
import  express,  { Request, Response } from "express";
import { Router } from 'express';
import { ObjectId } from "mongodb";
import { collections, connectToDatabase } from "../../services/database.service";
import Todo from "../../client/models/todo";
const todosRouter: Router = Router();

connectToDatabase ();
// GET
todosRouter.get("/api/todo", async (_req: Request, res: Response) => {
    try {
       const todos = (await collections?.todos?.find({}).toArray());
        res.status(200).send(todos);
    } catch (error:any) {
        res.status(500).send(error.message);
    }
});


todosRouter.get("/api/todo/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const todo = (await collections?.todos?.findOne(query));

        if (todo) {
            res.status(200).send(todo);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
todosRouter.post("/api/todo/", async (req: Request, res: Response) => {
       //     res.status(200).send('Access to api todo');
     //  const newtodo = req.body as Todo;
     try {
        const newtodo = req.body as Todo;
         const result = await collections?.todos?.insertOne(newtodo);

         result
             ? res.status(201).send(`Successfully created a new todo with id ${result.insertedId}`)
             : res.status(500).send("Failed to create a new todo.");
    } catch (error:any) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT
todosRouter.put("/api/todo/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedtodo: Todo = req.body as Todo;
        const query = { _id: new ObjectId(id) };

        const result = await collections?.todos?.updateOne(query, { $set: updatedtodo });

        result
            ? res.status(200).send(`Successfully updated task with id ${id}`)
            : res.status(304).send(`task with id: ${id} not updated`);
    } catch (error:any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
todosRouter.delete("/api/todo/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections?.todos?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed todo with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove todo with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`todo with id ${id} does not exist`);
        }
    } catch (error:any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// Global Config

todosRouter.use(express.json());

export default todosRouter;