import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate=useNavigate()
    let date=new Date()
    date=`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`
    const [name, setName] = useState('')
    const [fname, setFname] = useState('')
    const [dob, setDob] = useState('')
    const [email, setEmail] = useState('')
    const [mob, setMob] = useState('')
    const [add, setAdd] = useState('')
    const [schoolName, setSchoolName] = useState('')
    const [employeeCompany, setEmployeeCompany] = useState('')
    const [profession, setprofession] = useState('')
    const [course, setCourse] = useState('')
    const [error, setError] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [mobErr, setMobErr] = useState(false)
    const [msg, setMsg] = useState(false)

    async function submit() {
        setMob(mob.toString())
        if (!name || !email || !fname || !dob || !mob || !add||!course||!profession||!schoolName||!employeeCompany) setError(true)
        else {
            if (!email.includes('@') || email.slice(email.length - 4, email.length) !== '.com') {
                setEmailErr(true)
            } else {
                if(mob.length==10){
                let result = await fetch('http://localhost/signup', {
                    method: 'post',
                    body: JSON.stringify({ Created:date,Name:name, Email:email, FatherName:fname, DOB:dob, PhoneNo:mob,Address:add,Course:course,Profession:profession,SchoolName:schoolName,EmployeeCompany:employeeCompany,}),
                    headers: { 'Content-Type': 'application/json' }
                })
                result = await result.json()
                if(result) {
                    setTimeout(()=>
                    {
                        navigate('/')
                        setMsg(false)
                    },4000)
                    setMsg(true)
                }
            }
            else{
                setMobErr(true)
            }
        }
        }
    }
  
    function mobHandler(e){
    setMob(e.target.value)
    if(mobErr===true) setMobErr(false)
    }

    function reset(){
        setAdd('')
        setName('')
        setFname('')
        setEmail('')
        setMob('')
        setDob('')
        setCourse('')
        setEmployeeCompany('')
        setSchoolName('')
        setprofession('')
    }
    useEffect(()=>{
        if(profession==='Student'){
            setEmployeeCompany('-')
            setSchoolName('')
        }
        else if(profession==='Employee'){
            setSchoolName('-')
            setEmployeeCompany('')
        }
    },[profession])
    return (
        <div id='signup'>
            <div>
                <button onClick={()=>navigate('/')}>{'<-'}</button>
            </div>
            <h1>Enter Your Details : </h1>
            <div>
                <span>Enter Name </span><input value={name} onChange={(e) => setName(e.target.value)} type='text' />
                <div>{error && !name && <p>Please Enter Name</p>}</div>
            </div>
            <div>
                <span>Enter Father's Name </span><input value={fname} onChange={(e) => setFname(e.target.value)} type='text' />
                <div>{error && !fname && <p>Please Father's Name</p>}</div>
            </div>
            <div>
                <span>Enter D.O.B </span><input value={dob} onChange={(e) => setDob(e.target.value)} type='date' />
                <div>{error && !dob && <p>Please Enter Date Of Birth </p>}</div>
            </div>
            <div>
                <span>Enter Email </span><input value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
                <div>{error && !email && <p>Please Enter Email</p>}</div>
                <div>{emailErr && <p>Please Enter Valid Email</p>}</div>
            </div>
            <div>
                <span>Enter Contact No. </span><input value={mob} onChange={mobHandler} type='number' />
                <div>{error && !mob && <p>Please Enter Contact No.</p>}</div>
                <div>{mobErr && <p>Enter 10 Digit Contact No.</p>}</div>
            </div>
            <div>
                <span>Enter Address </span><input value={add} onChange={(e) => setAdd(e.target.value)} type='text' />
                <div>{error && !add && <p>Please Enter  Address</p>}</div>
            </div>
            <div>
                <span>Select Course</span>
                <select onChange={(e) => setCourse(e.target.value)}>
                    <option value={''}>Courses</option>
                    <option value={'Fullstack Web Developement'}>Fullstack Web Developement</option>
                    <option value={'Frontend Web Developement'}>Frontend Web Developement</option>
                    <option value={'Backend Web Developement'}>Backend Web Developement</option>
                    <option value={'Cloud Engineering'}>Cloud Engineering</option>
                </select>
            </div>
            <div>
                <span>Are You a </span>
                <select onChange={(e) => setprofession(e.target.value)}>
                    <option value=''>select</option>
                    <option value="Student">Student</option>
                    <option value="Employee">Employee</option>
                </select>
                {profession === 'Student' ?
                    <>
                        <span>Enter School/College Name </span>
                        <input type='text' value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
                       {error&&!schoolName&&<p>Please Provide School/College Name </p>}
                    </>
                    : profession === 'Employee' ?
                        <>
                        <span>Enter Working Company Name </span>
                        <input type='text' value={employeeCompany} onChange={(e) => setEmployeeCompany(e.target.value)} />
                        {error&&!employeeCompany&&<p>Please Provide Employee Company </p>}
                    </>
                    : null
                }
            </div>
            <div>
                <button onClick={submit}>Submit</button>
                <button onClick={reset}>Reset</button>
            </div>
            <div>
                {msg&&<h2>You Are Successfully Signup</h2>}
            </div>
        </div>
    )
}

export default Signup