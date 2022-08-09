import axios from "axios";
import React, { useState } from "react";

//DRAG AND DROP https://github.com/pmndrs/use-gesture

const buttonStyle = {
  //   width: "20%",
  padding: "5%",
  display: "flex",
  justifyContent: "center",
};

export default function ToDo({
  _id,
  task,
  description,
  setToDoItems,
  setTask,
  setDescription,
}) {
  // console.log(_id)
  const [editing, setEditing] = useState(false);
  const [newTask, setNewTask] = useState(task);
  const [newDescription, setNewDescription] = useState(description);

  const [isCompleted, setIsCompleted] = useState(false);
  let styles = {
    padding: "1rem",
    lineHeight: "1.4rem",
    // width: "80%",
  };

  if (isCompleted) {
    styles.textDecoration = "line-through";
  }
  //delete is currently deleting two items if they have the same task or description
  //need to check for uniqueness
  function editToDo() {
    //when edit button is clicked, reverse state of is editing
    setEditing((prevState) => !prevState);
  }
  function submitEdit() {
    axios
      .put("https://notesapi2000000l.herokuapp.com/notes", {
        _id: _id,
        task: newTask,
        description: newDescription,
      })
      .then(
        setToDoItems((prevState) =>
          prevState.map((obj) => {
            if (obj._id === _id) {
              obj.task = newTask;
              obj.description = newDescription;
            }
            return obj;
          })
        )
      )
      .catch((err) => console.error(err));

    editToDo();
  }
  function deleteItem() {
    console.log(`This is the id ${_id} `);
    axios
      .delete("https://notesapi2000000l.herokuapp.com/notes", {
        data: { _id: _id },
      })
      .then(setToDoItems((prevArr) => prevArr.filter((obj) => obj._id !== _id)))
      .catch((err) => console.error(err));
    // setToDoItems(prevArr => prevArr.filter(obj => obj.id !== _id))

    // setToDoItems(prevArr => prevArr.filter(obj => ))
  }

  //
  return (
    <section>
      <section className="indivToDo">
        <div className="container1">
          {editing ? (
            <input
              type="text"
              name="newtask"
              placeholder={task}
              value={newTask}
              style={{ width: "80%", height: "2rem", margin: "2%" }}
              onChange={(e) => setNewTask(e.target.value)}
            />
          ) : task !== "" || description !== "" ? (
            <p style={styles}>Task: {task}</p>
          ) : (
            <p
              style={{
                textAlign: "center",
                marginTop: "5rem",
                lineHeight: "25px",
              }}
            >
              This card has no task or description. Click edit to add a task and
              description!
            </p>
          )}
          {/* <p style={styles}>Task: {task}</p> */}
          {editing ? (
            <textarea
              name="newdescription"
              placeholder={description}
              value={newDescription}
              style={{ width: "80%", height: "3rem", margin: "2%" }}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          ) : (
            (task !== "" || description !== "") && (
              <p style={styles}>Description: {description}</p>
            )
          )}

          {/* <p style={styles}>Description: {description}</p> */}
        </div>
        {/* want to use icons for buttons eventually */}
        <div style={buttonStyle} className="buttonContainer">
          <button onClick={deleteItem}>Delete</button>
          {editing ? (
            <button onClick={submitEdit}>Submit</button>
          ) : (
            <button onClick={editToDo}>Edit</button>
          )}
          {/* <button onClick={editToDo}>Edit</button> */}
          <button
            type="button"
            onClick={() => setIsCompleted((prevValue) => !prevValue)}
          >
            Finished
          </button>
        </div>
      </section>
    </section>
  );
}
