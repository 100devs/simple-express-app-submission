import axios from '../../axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RecipeDeleteModal from '../../Components/RecipeDeleteModal/RecipeDeleteModal'
import { useDeleteRecipeMutation, useDislikeRecipeMutation, useLikeRecipeMutation } from '../../Api/api'
import Comments from '../../Components/Comments/Comments'
import Like from '../../img/like.png'
import Notlike from '../../img/notlike.png'
import Dislike from '../../img/dislike.png'
import Disliked from '../../img/disliked.png'
import './RecipePage.css'

const RecipePage = () => {
    const user = useSelector(state => state.user)
    const{id} = useParams()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState({})
    const [deleteRecipe, {isLoading, isSuccess}] = useDeleteRecipeMutation()
    const [likeRecipe] = useLikeRecipeMutation()
    const [dislikeRecipe] = useDislikeRecipeMutation()
    const [like, setLike] = useState('')
    const [isLiked, setIsLiked] = useState(false)
    const [dislike, setDislike] = useState('')
    const [isDisliked, setIsDisliked] = useState(false)

  
    // const [modalOpen, setModalOpen] = useState(false)

    // const handleModal = () => {
    //   if(window.confirm("Are you sure?")) setModalOpen(true)
    // }

    useEffect(() => {
        axios.get(`/recipes/${id}`).then(({data}) => {
            setRecipe(data)
            setLike(data.likes?.length)
            setDislike(data.dislikes?.length)
            if(data.likes.includes(user._id)) setIsLiked(true)
            if(data.dislikes.includes(user._id)) setIsDisliked(true)
        }).catch((error) => console.log(error))
    },[id])


    //why aren't we passing data?
    //fixed
    const handleDelete = (id) => {
      if(window.confirm("Are you sure?")) deleteRecipe({id: recipe._id, userId: user._id})
      navigate(`/profile/${user._id}`)
    }
    
    //why isn't this going to the backend?
    //fixed was sending an object with everything, not the ids only
    //need fix live update
    //fixed by setting likes in api call
    const handleLike = (id) => {
      likeRecipe({id: recipe._id, userId: user._id})
      setLike(isLiked? like - 1: like + 1)
      setIsLiked(!isLiked)
    }
    //handle unlike after refresh
    //did it in api call

    const handledislike = (id) => {
      dislikeRecipe({id: recipe._id, userId: user._id})
      setDislike(isDisliked? dislike - 1: dislike + 1)
      setIsDisliked(!isDisliked)
    }
    
  return (
    <div className='recipe-page'>
        <Link to={`/profile/${recipe.userId}`}><p>By: {recipe.userName}</p></Link>
        <p className='recipe-name'>{recipe.name}</p>
        <img style={{width: '500px', maxWidth: '90%'}} src={recipe.pictures ? recipe.pictures[0].url : "https://placekitten.com/200/300" } />
        
        <div className='likes'>
        <span>
         {user && <img src={isLiked ? Like : Notlike} alt='Like Icon' style={{cursor: "pointer", width: '17px', paddingTop: '5px'}} onClick={handleLike} />} Likes: {like} 
          </span>

          <span>
          {user && <img src={isDisliked ? Disliked : Dislike} alt='Dislike Icon' style={{cursor: "pointer", width: '17px', paddingTop: '5px'}} onClick={handledislike} />} Dislikes: {dislike}
          </span>
        </div>
        
        <div>
        <h3>Ingredients</h3>
        <p style={{whiteSpace: "pre-line"}}>{recipe.ingredients}</p>
        </div>

        <div>
        <h3>Instructions</h3>
        <p style={{whiteSpace: "pre-line"}}>{recipe.instructions}</p>
        </div>
        
        <div className='recipe-btns'>
        {!user ? '' : user._id === recipe.userId && <Link to={`/recipes/${recipe._id}/edit`}><button className='btn'>Edit Recipe</button></Link>}
        {!user ? '' : user._id === recipe.userId && <button className='btn cancel-btn' onClick={handleDelete}>Delete Recipe</button>}
        </div>

        <Comments recipe={recipe} />
    </div>
  )
}

export default RecipePage