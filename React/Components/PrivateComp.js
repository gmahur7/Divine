import React from 'react'
import { Outlet,Navigate} from 'react-router-dom'

function PrivateComp() 
{
    const admin = localStorage.getItem('admin')
    return admin ? <Outlet /> : <Navigate to='/adminlogin' />
}

export default PrivateComp;