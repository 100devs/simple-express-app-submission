import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
import { useUpdateProfileMutation } from '../../Api/api'
import axios from '../../axios'
import './ProfileModal.css'

const ProfileModal = ({currentUser, modalOpen, handleClose}) => {
  

    // const {currentUserId} = useParams()

    const [description, setDescription] = useState('')
    const [picture, setPicture] = useState([])
    const [imgToRemove, setImgToRemove] = useState(null)
    const [updateProfile, {isLoading, error}] = useUpdateProfileMutation()
    const navigate = useNavigate()

    
    useEffect(() => {
      axios.get(`/users/${currentUser._id}`).then(({data}) => {
        setDescription(data.description)
        setPicture(data.picture)
      }).catch((error) => console.log(error))
    },[currentUser])

    const handleSubmit = (e) => {
      e.preventDefault()
      updateProfile({id: currentUser._id, picture: picture, description: description})
      setInterval(() => {
        window.location.reload()
      }, 1500)
      
    }
    console.log(currentUser._id)

    const handleRemoveImg = (imgObj) => {
      setImgToRemove(imgObj.public_id)
      axios.delete(`/images/${imgObj.public_id}`)
      .then((res) => {
          setImgToRemove(null)
          setPicture((prev) => prev.filter((img) => img.public_id !== imgObj.public_id))
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
            setPicture((prev) => [...prev, {url: result.info.url, public_id: result.info.public_id}])
          }
        }
      )
      widget.open()
    }

    if(!modalOpen) return null

  return (
    <div className='profile-modal'>
      <span onClick={handleClose} style={{cursor: 'pointer'}} className='another-cancel'>x</span>
        <form className='form' onSubmit={handleSubmit}>
            <div className='modal-form'>
              
                <label for='name'>Description</label>
                <textarea type="text" placeholder='Description' value={description} required onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <button type='button' className='btn' onClick={showWidget}>Upload Image</button>
            <div>
                
                <div>
                    {picture.map((pic) => (
                        <div>
                            <img className='preview-picture' style={{height: '200px', objectFit: 'cover'}} src={pic.url} />
                            {imgToRemove !== pic.public_id && <i className='cancel-x' style={{cursor: "pointer"}} onClick={() => handleRemoveImg(pic)}>X</i>}
                        </div>
                    ))}
                </div>
            </div>
            <div className='modal-btns'>
            <button className='btn update-btn' disabled={isLoading} type='submit'>Update Profile</button><button className='btn cancel-btn' onClick={handleClose}>Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default ProfileModal
