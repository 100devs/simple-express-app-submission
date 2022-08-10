import React from 'react'
import classes from './PickList.module.css';

const PickList = (props) => {
  // console.log(props.list)
  
  const selectListItem = (itemName, itemType) => {
    props.fetchListItem(itemName, itemType)
  }
  const items = props.list.data.map((item, index) => { 
    return (
      <li className={classes.listItem} key={`${index}-${item.name}`}>
        <div className={classes.hidden}></div>
        <span>{item.name}</span>
        <button onClick={() => selectListItem(item.name, props.list.type)}>
          Select
        </button>
        <div className={classes.hidden}></div>
      </li>
    )
  })

  return (
    <ul>
      {items}
    </ul>
  )
}

export default PickList