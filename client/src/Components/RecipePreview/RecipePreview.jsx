import React from 'react'
import { Link } from 'react-router-dom'
import './RecipePreview.css'

const RecipePreview = ({_id, userId, category, name, pictures, ingredients, userName}) => {

    
  return (
    <div>
        <div className='recipe-preview'>
            <Link to={`/recipes/${_id}`}>
            <p style={{textAlign: 'center'}}>{name}</p>
            <img className='preview-pic' src={pictures[0].url} />
            </Link>
            <p style={{display: 'none'}}>{ingredients}</p>
            {/* <Link to={`/category/${category}`}><p>{category}</p></Link> */}
            <p style={{marginLeft: 25}}>By: <Link to={`/profile/${userName}`}>{userName}</Link></p>
        </div>
    </div>
  )
}

export default RecipePreview