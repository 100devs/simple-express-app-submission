import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from '../../axios'
import './MyRecipies.css'

const MyRecipies = ({user}) => {
  
  // const user = useSelector(state => state.user)
  // const recipe = useSelector(state => state.recipe)

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
      axios.get(`/users/${user._id}/recipes`).then(({data}) => {
      setRecipes(data)
    }).catch((error) => console.log(error))
  },[user])

  if(!user){
    return <h1>Loading</h1>
}

  return (
    <div>
        <div className='my-recipes'>
            {recipes.length !==0 ?
            recipes.map((recipe) => (
              <>
              <Link to={`/recipes/${recipe._id}`}><p style={{textAlign: 'center'}}>{recipe.name}</p>
              <img className='my-recipes-pic' src={recipe.pictures[0].url} /></Link>
              </>
            )) : <h2>No recipes yet</h2>
            }
        </div>
    </div>
  )
}

export default MyRecipies