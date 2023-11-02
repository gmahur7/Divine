import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
    const navigate = useNavigate()
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loginFailed, setLoginFailed] = useState(false)
    const admin=localStorage.getItem('admin')     
    if(admin) navigate('/admin')
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
                localStorage.setItem('admin',JSON.stringify(result.admin))
                localStorage.setItem('token',JSON.stringify(result.auth))
                navigate('/admin')
            }
            else {
                setLoginFailed(true)
            }
        }
    }
    useEffect(()=>
    {
        if(admin) navigate('/admin')
    })
    return (
        <div id='adminlogin'>
            <div>
                <button onClick={()=>navigate('/')}>{'<-'}</button>
            </div>
            <h1>Admin Login</h1>
            <div>
                <div>
                    <span>Enter Id</span>
                    <input type='text' value={id} onChange={(e) => setId(e.target.value)} />
                    <div>
                        {error && !id && <p>Please Provide Admins Id</p>}
                    </div>
                </div>
                <div>
                    <span>Enter Password</span>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div>
                        {error && !password && <p>Please Provide Admins Password</p>}
                    </div>
                </div>
                <div>
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