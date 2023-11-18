import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loginFailed, setLoginFailed] = useState(false)
  const admin = localStorage.getItem('admin')
  if (admin) navigate('/admin')
  async function login() {
    if (!id || !password) {
      setError(true)
    }
    else {
      let result = await fetch('http://localhost/adminlogin', {
        method: 'post',
        body: JSON.stringify({ id, password }),
        headers: { 'Content-Type': 'application/json' }
      })
      result = await result.json();
      if (result.auth) {
        localStorage.setItem('admin', JSON.stringify(result.admin))
        localStorage.setItem('token', JSON.stringify(result.auth))
        navigate('/admin')
      }
      else {
        setLoginFailed(true)
      }
    }
  }
  useEffect(() => {
    if (admin) navigate('/admin')
  })
  return (
    <div className="main-wrapper">
      <div className="background-img"></div>
      <div className="overlay"></div>
      <div className="signup-container" id='adminlogin'>
        <div className="signup-header admin-signup-header">
          <button
            className='back-button'
            onClick={() => navigate('/')}
          >
            &lArr;
          </button>
          <h1 className='signup-heading'>Admin Login</h1>
        </div>
        <div className='form-group'>
          <input placeholder=" " className='form-control' type='text' value={id} onChange={(e) => setId(e.target.value)} />
          <label>Enter Id</label>
          {error && !id && <p className='error'>Please Enter Admin Id</p>}
        </div>
        <div className='form-group'>
          <input placeholder=" " className='form-control' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <label>Enter Password</label>
          {error && !password && <p className='error'>Please Enter Password</p>}
        </div>
        <div className="signup-button">
          <button onClick={login}>Login</button>
        </div>
        <div>
          {loginFailed && <h3>Admin Not found</h3>}
        </div>
      </div>
    </div>
  )
}

export default AdminLogin;