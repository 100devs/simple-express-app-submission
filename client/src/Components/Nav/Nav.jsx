import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {logout} from '../../Slices/userSlice'
import './Nav.css'
import DefaultPic from '../../img/default-pic.png'
import { useState } from 'react'
import axios from '../../axios'

const Nav = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)
  const [picture, setPicture] = useState([])
  const [getUser, setGetUser] = useState()

  useEffect(() => {
    if(!user) return
    const fetchUser = () => {
      axios.get(`/users/${user._id}`).then(({data}) => {
        setPicture(data?.picture[0]?.url)
        setGetUser(data)
      }).catch((error) => console.log(error))
    }
    fetchUser()
  },[user])

  const handleLogout = () => {
    if(window.confirm('Are you sure?'))dispatch(logout())
  }

  const handleToggle = () => {
    setShow(!show)
  }
    
  return (
    <div className='nav'>
      <div className='brand'>
        <h3><Link to={'/'}>Open Recipe </Link></h3>
      </div>
      <a style={{cursor: 'pointer'}} onClick={handleToggle} className='toggle'>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </a>
      <div className="links" id={show ? 'hidden':''}>
        {user && (<Link to={`/profile/${user._id}`}>
          <img style={{height: 40, borderRadius: '50%', marginTop: 8}}
          src = {getUser?.picture?.length === 0 ? DefaultPic : picture} 
          /> </Link>)}
        <Link to={'/category/food'}><h4>Food </h4></Link>
        <Link to={'/category/drinks'}><h4>Drinks </h4></Link>
        {!user ? (<Link to={'/login'}><h4>Login </h4></Link>) :
        (<Link to={'/'}><h4 onClick={handleLogout}>Logout</h4></Link>)}
      </div>
    </div>
  )
}

export default Nav