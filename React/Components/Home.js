import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function Home(){
    return(
        <div>
        <div className="background-img"></div>
      <div className="overlay"></div>
        <div className="signup-container" id='home'>
            <h1>Home</h1>
            <div className='link-wrap'>
                <Link to='/adminlogin' className='admin-link'>Admin Login</Link>
                <Link to='/signup' className='admin-link'>User SignUp</Link>
            </div>
        </div>
        </div>
    )
}

export default Home;