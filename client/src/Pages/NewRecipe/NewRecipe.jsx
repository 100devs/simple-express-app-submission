import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCreateRecipeMutation } from '../../Api/api'
import axios from '../../axios'
import './NewRecipe.css'

const NewRecipe = () => {

    const user = useSelector(state => state.user)
    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState("")
    const [instructions, setInstructions] = useState('')
    const [category, setCategory] = useState('')
    const [pictures, setPictures] = useState([])
    const [imgToRemove, setImgToRemove] = useState(null)
    // const [userId, setUserId] = useState('')
    const navigate = useNavigate()
    const [createRecipe, {isError, error, isLoading, success}] = useCreateRecipeMutation()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!name || !ingredients || !instructions || !category || !pictures.length){
            return alert('Please fill out all fields')
        }else{
            createRecipe({userId: user._id, userName: user.userName, name, ingredients, instructions, category, pictures})
            .then(({data}) => {
                if(data.length > 0){
                    navigate(`/profile/${user._id}`)
                }
            })
        }
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
            <div className='form-group'>
                <button className='btn' type='button' onClick={showWidget}>Upload Image</button>
            </div>
            <div>
                
                <div className='form-group'>
                    {pictures.map((picture) => (
                        <div>
                            <img className='preview-picture' src={picture.url} />
                            {imgToRemove !== picture.public_id && <i className='cancel-x' style={{cursor: "pointer"}} onClick={() => handleRemoveImg(picture)}>X</i>}
                        </div>
                    ))}
                </div>
            </div>

            <button className='btn' type='submit'>Add Recipe</button>
            
        </form>
    </div>
  )
}

export default NewRecipe