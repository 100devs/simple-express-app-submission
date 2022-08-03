import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
	const { dispatch } = useWorkoutsContext();
	const [title, setTitle] = useState('');
	const [load, setLoad] = useState('');
	const [reps, setReps] = useState('');
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const workout = {
			title,
			load,
			reps,
		};

		const response = await fetch('/api/workouts', {
			method: 'POST',
			body: JSON.stringify(workout),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
		}

		if (response.ok) {
			setError(null);
			console.log('New workout added', json);

			// done with context:
			dispatch({ type: 'CREATE_WORKOUT', payload: json });

			// We are going to be using React context for updating our local state with our database, instead of just passing down state from our home component like this:
			// setWorkouts((prevWorkouts) => {
			// 	return [json, ...prevWorkouts];
			// });
			setTitle('');
			setLoad('');
			setReps('');
		}
	};
	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a new workout</h3>
			<label htmlFor="">Exercise Title:</label>
			<input
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
			/>
			<label htmlFor="">Load (in kg):</label>
			<input
				type="number"
				onChange={(e) => setLoad(e.target.value)}
				value={load}
			/>
			<label htmlFor="">Reps:</label>
			<input
				type="number"
				onChange={(e) => setReps(e.target.value)}
				value={reps}
			/>

			<button type="submit">Add Workout</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default WorkoutForm;
