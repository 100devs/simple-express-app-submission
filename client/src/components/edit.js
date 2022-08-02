import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

const SERVER_URL = (env.NODE_ENV === 'production') ? 'https://dbapidb.herokuapp.com/api' : 'http://localhost:8000/api';

export default function Edit() {
  const [form, setForm] = useState({
    name: '',
    planet: '',
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`${SERVER_URL}/character/ID/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate('/');
        return;
      }

      setForm(record);
    }

    fetchData();
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      planet: form.planet,
    };

    // This will send a post request to update the data in the database.
    await fetch(`${SERVER_URL}/character/update/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedPerson),
    });
    navigate('/');
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Edit Character</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="planet">Planet: </label>
          <input
            type="text"
            className="form-control"
            id="planet"
            value={form.planet}
            onChange={(e) => updateForm({ planet: e.target.value })}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Submit Update"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
