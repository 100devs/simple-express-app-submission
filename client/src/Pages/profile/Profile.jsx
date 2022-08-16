import React, {Suspense} from 'react'
import { useSelector } from 'react-redux'
// import MyRecipies from '../../Components/MyRecipies/MyRecipies'
import DefaultPic from '../../img/default-pic.png'
import axios from '../../axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProfileModal from '../../Components/ProfileModal/ProfileModal'
import './Profile.css'
const MyRecipies = React.lazy(() => import('../../Components/MyRecipies/MyRecipies'))

const Profile = () => {

  const currentUser = useSelector(state => state.user)
  // const userName = useParams().userName
  const {id} = useParams()
  
  const [user, setUser] = useState({})
  const [picture, setPicture] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  const handleModal = () => {
    setModalOpen(true)
  }

  // useEffect(() => {
  //   const fetchUser = () => {
  //     axios.get(`/users?userName=${userName}`).then(({data}) => {
  //       setUser(data)
  //       setPicture(data?.picture[0]?.url)
  //     }).catch((error) => console.log(error))
  //   }
  //   fetchUser()
  // },[userName])

  useEffect(() => {
    const fetchUser = () => {
      axios.get(`/users/${id}`).then(({data}) => {
        setUser(data)
        setPicture(data?.picture[0]?.url)
      }).catch((error) => console.log(error))
    }
    fetchUser()
  },[id])

  return (
    <div className='profile'>
      <div className='profile-left'>
        <div>{user.userName}'s profile</div>
        <div className='pic-and-desc'>
          <img className='profile-pic' alt='Profile' src={user?.picture?.length === 0 ? DefaultPic : picture} />
          <div><p>{user.description === '' ? 'Describe yourself' : user.description}</p></div>
        </div>
        <div>
        {!currentUser? '' : currentUser._id === user?._id &&
        <Link to={'/new-recipe'}><button className='btn'>Add new recipe</button></Link>}
        </div>
        
        {!currentUser? '' : currentUser._id === user?._id && <button className='btn' onClick={handleModal}>Update profile</button>}     
      </div>
      <div>
        <div className="profile-right">
          <Suspense fallback={<div>...Loading</div>}>
            <MyRecipies user={user}/>
          </Suspense>
        </div>
      </div>
      {!currentUser? '' : currentUser._id === user?._id && 
        <ProfileModal modalOpen={modalOpen} handleClose={() => setModalOpen(false)} currentUser={currentUser} 
        />}
    </div>
  )
}

export default Profile