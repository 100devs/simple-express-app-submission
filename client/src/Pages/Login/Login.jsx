import React from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../Api/api'
import './Login.css'

const Login = () => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [login, {isError, isLoading, error, isSuccess}] = useLoginMutation()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    login({userName, password})
  }
  
  // const checkError = () => {
  //   if(!error) navigate('/')
  // }

  return (
    <div className='login-container'>
      <h1>Log in</h1>
      {isError ? <span>{error.data}</span> : ''}
      {isSuccess && <Navigate to={('/')} />}
        <form action="" onSubmit={handleLogin}>
            <div>
                <input type="text" placeholder='User Name' value={userName} required onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <br />
            <div>
                <input type="password" placeholder='Password' value={password} required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br />
            <button type='submit' disabled={isLoading}>Login</button>
            <p>Don't have an account? <Link to={'/signup'}>Sign Up</Link></p>
        </form>

        
    </div>
  )
}

export default Login