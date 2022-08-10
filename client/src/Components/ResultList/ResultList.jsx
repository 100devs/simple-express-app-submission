import React from 'react'
import classes from './ResultList.module.css';

const ResultList = (props) => {
  // console.log(props.list.data)
  
  // Store all result data
  const game = props.list.data.game
  const track = props.list.data.track
  const leaderboard = props.list.data.leaderboard

  // Create a table row for each result in leaderboard array
  const tableRows = leaderboard.map((result, index) => { 
    const trophy = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''
    return (
      <tr key={result._id}>
        <td>{trophy || index + 1}</td>
        <td>{result.driverInitial}</td>
        <td>{result.time}</td>
        <td>{result.car}</td>
      </tr>
    )
  })

  return (
    <div className={classes.tableContainer}>
      <h1 className={classes.resTitle}>{game}: {track}</h1>
      <table className={classes.resTable}>
        <thead>
        <tr>
          <th>Position</th>
          <th>Time</th>
          <th>Driver</th>
          <th>Car</th>
        </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
      <button onClick={props.showForm}>Show Form</button>
    </div>
  )
}

export default ResultList