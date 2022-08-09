import axios from "axios";
// import {data} from "./components/data"
import { useState, useEffect } from "react";
import ToDo from "./components/ToDo";
import "./App.css";
// https://www.youtube.com/watch?v=15A0F5aOoPM

const endpointURL = "https://notesapi2000000l.herokuapp.com/notes";
const formStyles = {
  // width: "20%",
  fontSize: "1.2rem",
  paddingTop: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#363062",
  color: "#f8e9e0",
  // marginLeft: "2rem",
  // margin: "0 auto"
};
const container = {
  // marginTop: "15%",
  fontSize: "1.4rem",
  backgroundColor: "#363062",
  display: "flex",
  justifyContent: "space-around",
  minHeight: "100vh",
};
// const toDoContainer = {
//   display: "flex",
//   justifyContent: "space-between",
//   width: "80%",
//   flexWrap: "wrap",
// };
export default function App() {
  const [toDoItems, setToDoItems] = useState([
    {
      task: "",
      description: "",
    },
  ]);
  console.log(toDoItems);
  if (toDoItems.length === 1) {
  }
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  //finish moving axios requests to different files
  // function resetTodo(){
  //   axios.get(endpointURL)
  //       .then(data => {
  //         console.log('Data from get request',data)
  //         setToDoItems(data.data)})
  //       .catch(err => console.error(err))
  // }
  // useEffect(()=> resetTodo(), [])

  useEffect(() => {
    axios
      .get(endpointURL)
      .then((data) => {
        console.log("Data from get request", data);
        setToDoItems(data.data);
      })
      .catch((err) => console.error(err));
  }, []);
  //creating a new toDoItem in the database
  function addToDo() {
    axios
      .post(endpointURL, { task: task, description: description })
      .then((response) => {
        console.log(response);
        setToDoItems((prevData) => [
          ...prevData,
          {
            _id: response.data.insertedId,
            task,
            description,
          },
        ]);
      })
      .catch((err) => console.error(err));
    //when click the button, want to add {task: , description: } to toDoItems
  }
  //when click edit, want to render a component with two input fields, then when press enter it will send PUT request to API, and
  //trigger a rerender because will update state of
  //toDoItems
  // function editToDo(_id) {
  //   axios
  //     .put(endpointURL, { _id: _id, task: task, description: description })
  //     .then(
  //       setToDoItems((prevState) =>
  //         prevState.map((obj) => {
  //           if (obj._id === _id) {
  //             obj.task = task;
  //             obj.description = description;
  //           }
  //           return obj;
  //         })
  //       )
  //     )
  //     .catch((err) => console.error(err));
  // }

  return (
    <>
      <form style={formStyles} className="formArea">
        Task:{" "}
        <input
          type="text"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        Description:{" "}
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="button" onClick={addToDo}>
          Add
        </button>
      </form>
      <div style={container}>
        <section className="toDoContainer">
          {toDoItems.map((obj, index) => (
            <ToDo
              key={obj._id}
              setToDoItems={setToDoItems}
              setTask={setTask}
              setDescription={setDescription}
              {...obj}
            />
          ))}
          {/* if (index % 2 === 0) {
            return (
              <div className="column">
                <ToDo
                  key={obj._id}
                  setToDoItems={setToDoItems}
                  editToDo={editToDo}
                  {...obj}
                />
              </div> */}

          {/* } else {
            return (
              <div className="column">
                <ToDo
                  key={obj._id}
                  setToDoItems={setToDoItems}
                  editToDo={editToDo}
                  {...obj}
                />
              </div>
            );
          } */}
        </section>
      </div>
    </>
  );
}
//https://www.youtube.com/c/LayoutLand/videos
//where to put state? If I need it for add, delete, update
//
// https://www.youtube.com/watch?v=qNtJ5p3h2A4
