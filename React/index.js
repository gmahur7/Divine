import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'

import './index.css'
import Signup from './Components/SignupForm'
import Home from './Components/Home'
import AdminLogin from './Components/AdminLogin'
import Admin from './Components/Admin'
import PrivateComp from './Components/PrivateComp'
import 'font-awesome/css/font-awesome.min.css';


function Divine()
{
    const params=useParams()
    let {func}=params;
    console.log('params : ',func)
    return(
        <Router>
            <Routes> 
                <Route path='/' element={<Home/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/adminlogin' element={<AdminLogin/>}/>
                <Route element={<PrivateComp/>} >
                <Route path='/admin' element={<Admin/>}/>
                </Route>
                <Route path='/func' element={<Home/>}/>
            </Routes>
        </Router>
    )
}

ReactDOM.createRoot(document.getElementById('main')).render(<Divine/>)