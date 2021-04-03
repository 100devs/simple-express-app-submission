const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Database replacement
const notes = [
  {
    id: 0,
    description: "This note is a sample note",
  },
  {
    id: 1,
    description: "This note is a 2nd sample note",
  },
  {
    id: 2,
    description: "Abhishek is a super awesome programmer",
  },
];

// CRUD requests
app.get("/", (req, res) => {
  res.send(`<p>Hello World!</p>`);
});
app.get("/notes", (req, res) => {
  res.status(200).json(notes);
});

app.post("/notes", (req, res) => {
  notes.push({ id: notes.length, description: req.body.description });
  res.status(200).send(`Added ${req.body.description} to notes`);
});

app.put("/notes/:id", (req, res) => {
  if (!notes.some((note) => note.id == req.params.id)) {
    res.status(404).send(`Note was not found`);
  } else {
    notes.find((note) => note.id == req.params.id).description =
      req.body.description;
    res
      .status(200)
      .send(
        `Changed note with id of ${req.params.id} to a description of ${req.body.description}`
      );
  }
});

app.delete("/notes/:id", (req, res) => {
  if (!notes.some((note) => note.id == req.params.id)) {
    res.status(404).send("Note was not found. Please try again");
  } else {
    notes.splice(
      notes.findIndex((note) => note.id == req.params.id),
      1
    );
    res.status(200).send(`Note has been deleted`);
  }
});

const PORT = 3000;

app.listen(PORT, console.log(`Starting server on port ${PORT}`));
