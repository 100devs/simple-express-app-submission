import React from 'react'
import './Home.css'
import categories from '../../categories'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from './../../axios'
import { updateRecipes } from '../../Slices/recipeSlice'
import RecipePreview from '../../Components/RecipePreview/RecipePreview'
import { useState } from 'react'

const Home = () => {

  const recipes = useSelector(state => state.recipes)
  const dispatch = useDispatch()
  const [getRecipes, setGetRecipes] = useState([])

  useEffect(() => {
    axios.get('/recipes').then(({data}) => {
      dispatch(updateRecipes(data))
      setGetRecipes(data)
    })
  },[])

  const latestRecipes = getRecipes?.slice(-8).reverse()

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Latest Recipies</h1>
      <div className="latest-recipe-container">
        <div className="recipes">
          {latestRecipes?.map((recipe) => (
            <RecipePreview {...recipe} />
          ))}
        </div>
      </div>

      <h1 style={{textAlign: 'center'}}>Categories</h1>
      <div className="category-container-home">
        {categories.map((category) => (
          <Link to={`/category/${category.name.toLowerCase()}`}>
          <div>
            <p>{category.name}</p>
            <img className='category-image' style={{height: '200px'}} src={category.img} />
            
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home