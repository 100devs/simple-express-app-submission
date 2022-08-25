import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignupMutation } from '../../Api/api'
import '../Login/Login.css'

const Signup = () => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [signup, {isError, isLoading, error}] = useSignupMutation()
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    if(password === confirmPass){
      signup({userName, email, password})
      navigate('/')
    }
  }

  return (
    <div className='login-container'>
      <h1>Create an Account</h1>
        <form action="" onSubmit={handleSignup}>
            <div className='signup-group'>
                <input type="text" placeholder='User Name' value={userName} required onChange={(e) => setUserName(e.target.value)} />
                <input type="text" placeholder='email' value={email} required onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <br />
            <div className='signup-group'>
                <input type="password" placeholder='Password' value={password} required onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder='Confirm Password' value={confirmPass} required onChange={(e) => setConfirmPass(e.target.value)} />
            </div>
            <span style={{display: confirmPass === password ? "none" : "block", color: "red", fontSize: "12px", alignSelf: "flex-end", marginRight: "5px"}}>
                    *Passwords must match
            </span>
            <br />
            <button type='submit' disabled={isLoading}>Sign Up</button>
        </form>
        <p>Already have an account? <Link to={'/login'}>Login</Link></p>
    </div>
  )
}

export default Signup