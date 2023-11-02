import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function Home(){
    return(
        <div id='home'>
            <h1>Home</h1>
            <div>
                <Link to='/adminlogin'>Admin Login</Link>
                <Link to='/signup'>User SignUp</Link>
            </div>
        </div>
    )
}

export default Home;