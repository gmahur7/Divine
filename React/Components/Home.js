import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <div className="main-wrapper">
      <div className="background-img"></div>
      <div className="overlay"></div>
      <div className="signup-container" id='home'>
        <h1 className="home-heading">Divine</h1> 
        <div className='home-btn-wrapper'>
          <Link to='/adminlogin'>Admin Login</Link>
          <Link to='/signup'>Registration</Link>
        </div>
      </div>
    </div>
  )
}

export default Home;