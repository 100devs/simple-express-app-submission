import { useEffect, useState } from "react";
import Journals from "./Journals";
import { useAuth } from "../contexts/AuthContext";

const Form = ({ slider, ratio, recWater, time }) => {
  const [notes, setNotes] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useAuth();

  const onUpdate = async (id) => {
    setData(data.filter((data) => data._id !== id));
    const newNote = prompt ("Enter the new note: ")

    const res = await fetch(
      `http://localhost:3001/updateJournal/${id}&${currentUser.uid}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({newNote: newNote}),
      }
    )
      addJournal()
  }

  const onSubmit = async (e) => {
    const current = new Date();
    const date = `${current.getMonth()}/${current.getDate()}/${current.getFullYear()}`
    const ratioConv = 1 / ratio;
    e.preventDefault();
    const coffee = {
      date: date,
      notes: notes,
      ratio: `1/${ratioConv}`,
      recWater: recWater,
      coffeeGrams: slider,
      selection: sessionStorage.getItem("selection"),
      time: time,
    };
    setIsPending(true);

    // addJournal({notes})

    await fetch(`http://localhost:3001/addJournal/${currentUser.uid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coffee),
    }).then(() => {
      setIsPending(false);
    });

    addJournal(notes);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:3001/getJournal/${
          currentUser.uid
        }&${sessionStorage.getItem("selection")}`
      );

      const data = await res.json();
      // console.log(data)
      setData(data);
    };
    fetchData();
  }, [currentUser.uid]);

  const onDelete = async (id) => {
    setData(data.filter((data) => data._id !== id));
    await fetch(
      `http://localhost:3001/deleteJournal/${id}&${currentUser.uid}`,
      {
        method: "DELETE",
        // body: JSON.stringify(id)
      }
    )
      .then(console.log("deleted"))
      .catch((error) => console.error(error));
  };

  const addJournal = async (notes) => {
    const res = await fetch(
      `http://localhost:3001/getJournal/${
        currentUser.uid
      }&${sessionStorage.getItem("selection")}`
    );

    const data = await res.json();
    setData([...data], data);
  };

  // return data

  return (
    <div>
      {/* <>
      {data.map((e) => {
        return <h3 key={e._id}>{e.notes}</h3>
      })}
      </> */}
      <Journals data={data} onDelete={onDelete} onUpdate={onUpdate}></Journals>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          name="notes"
          placeholder="notes"
        />
        {!isPending && <button type="submit">submit</button>}
        {isPending && <button disabled>Adding notes...</button>}
      </form>
    </div>
  );
};

export default Form;
