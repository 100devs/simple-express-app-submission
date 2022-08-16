import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateRecipeMutation } from '../../Api/api'
import axios from '../../axios'

const EditRecipe = () => {

    const {id} = useParams()

    const user = useSelector(state => state.user)
    const [posterId, setPosterId] = useState('')
    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState("")
    const [instructions, setInstructions] = useState('')
    const [category, setCategory] = useState('')
    const [pictures, setPictures] = useState([])
    const [imgToRemove, setImgToRemove] = useState(null)
    const navigate = useNavigate()
    const [updateRecipe, {isError, error, isLoading, success}] = useUpdateRecipeMutation()

    useEffect(() => {
        axios.get(`/recipes/${id}`).then(({data}) => {
            setPosterId(data.userId)
            setName(data.name)
            setIngredients(data.ingredients)
            setInstructions(data.instructions)
            setCategory(data.category)
            setPictures(data.pictures)
        }).catch((error) => console.log(error))
    },[id])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!name || !ingredients || !instructions || !category || !pictures.length){
            return alert('Please fill out all fields')
        }else{
            updateRecipe({id, userId: user._id, userName: user.userName, name, ingredients, instructions, category, pictures})
            .then(({data}) => {
                if(data.length > 0){
                    navigate(`/recipes/${id}`)
                }
            })
        }
    }
    //block non-users
    if(user._id !== posterId){
        return <h1>Forbidden</h1>
    }

    const handleRemoveImg = (imgObj) => {
        setImgToRemove(imgObj.public_id)
        axios.delete(`/images/${imgObj.public_id}`)
        .then((res) => {
            setImgToRemove(null)
            setPictures((prev) => prev.filter((img) => img.public_id !== imgObj.public_id))
        }).catch((error) => console.log(error))
    }

  
    const showWidget = () => {
        const widget = window.cloudinary.createUploadWidget(
          {
            cloudName: "dru5sgyil",
            uploadPreset: "bylx7fzf"
          },
          (error, result) => {
            if(!error && result.event === 'success'){
              setPictures((prev) => [...prev, {url: result.info.url, public_id: result.info.public_id}])
            }
          }
        )
        widget.open()
      }


  return (
    <div>
        <form className='form' onSubmit={handleSubmit}>
            <div className='form-group'>
                <label for='name'>Recipe Name</label>
                <input type="text" placeholder='Recipe name' value={name} required onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className='form-group'>
                <label for='ingredient'>Ingredients</label>
                <textarea type="text" placeholder='Ingredients' name='ingredient' value={ingredients} required onChange={(e) => setIngredients(e.target.value)}/>
            </div>

            <div className='form-group'>
                <label for='instructions'>Instructions</label>
                <textarea type="text" placeholder='Instructions' value={instructions} required onChange={(e) => setInstructions(e.target.value)}/>
            </div>

            <div className='form-group'>
                <label for='category'>Category</label>
                <select name='category' required onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Food or Drink</option>
                    <option value="food">Food</option>
                    <option value="drinks">Drink</option>
                </select>
            </div>
            <button className='btn' type='button' onClick={showWidget}>Upload Image</button>
            <div className='form-group'>
                
                <div>
                    {pictures.map((picture) => (
                        <div>
                            <img className='preview-picture' src={picture.url} />
                            {imgToRemove !== picture.public_id && <i className='cancel-x' style={{cursor: "pointer"}} onClick={() => handleRemoveImg(picture)}>X</i>}
                        </div>
                    ))}
                </div>
            </div>

            <button className='btn' type='submit'>Update Recipe</button>
            
        </form>
    </div>
  )
}

export default EditRecipe