import React, {Suspense} from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../axios'
import './CategoryPage.css'
// import RecipePreview from '../../Components/RecipePreview/RecipePreview'
const RecipePreview = React.lazy(() => import('../../Components/RecipePreview/RecipePreview'))

const CategoryPage = () => {

    const {category} = useParams()
    const [recipes, setRecipes] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        axios.get(`recipes/category/${category}`)
        .then(({data}) => {
            setRecipes(data)
        }).catch((error) => console.log(error))
    },[category])

  return (
    <div className='category-container'>
      <div className='search'>
        <label>Search by name or ingredient</label>
        <input type="search" placeholder='Search' onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className='category-recipes'>
        {recipes.filter((recipe) => {
              if(query === ""){
                  return recipe
              }else if(recipe.ingredients.toString().toLowerCase().includes(query.toLowerCase())){
                  return recipe
              }else if(recipe.name.toLowerCase().includes(query.toLowerCase())){
                  return recipe
              }

          }).map((recipe) => (
            <Suspense fallback={<div>...Loading</div>}>
              <RecipePreview {...recipe} />
            </Suspense>
          ))
          }
        </div>
        {/* {recipes.length === 0 ? <h2>Nothing here yet</h2> :
        recipes.map((recipe) => (
           <RecipePreview {...recipe} />
        ))} */}
    </div>
  )
}

export default CategoryPage