import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../axios'

const RecipeDeleteModal = ({recipe, setModalOpen}) => {

    const {id} = useParams()

  

  return (
    <div>
        <button onClick={() => setModalOpen(false)}>X</button>
        <h1>Are you sure you want to delete {recipe.name} </h1>
    </div>
  )
}

export default RecipeDeleteModal