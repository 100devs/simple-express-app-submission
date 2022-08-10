import React from 'react'
import classes from './Card.module.css'

const Card = (props) => {
  return (
    <article className={classes.card}>{props.children}</article>
  )
}

export default Card