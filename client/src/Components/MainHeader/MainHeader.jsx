import React from 'react'
import classes from './MainHeader.module.css'

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <ul>
        <li className={classes.headerBack} onClick={props.fetchPrevious}>Back</li>{/* new; invisible spacer item */}
        <li className={classes.headerCenter} onClick={props.titleClick}>Time Trials App</li>
        <li className={classes.headerAddTime} onClick={props.showForm}>Add Time</li>
      </ul>
    </header>
  )
}

export default MainHeader