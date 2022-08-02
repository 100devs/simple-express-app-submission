import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const SERVER_URL = (env.NODE_ENV === 'production') ? 'https://dbapidb.herokuapp.com/api' : 'http://localhost:8000/api';

export default function Create() {
  const [form, setForm] = useState({
    name: '',
    planet: '',
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newCharacter = { ...form };

    await fetch(`${SERVER_URL}/character/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCharacter),
    })
      .catch((error) => {
        window.alert(error);
      });

    setForm({ name: '', planet: '' });
    navigate('/');
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Character</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="planet">Planet</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.planet}
            onChange={(e) => updateForm({ planet: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
