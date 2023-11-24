import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { api_url } from '../env';

const Signup = () => {
  const navigate = useNavigate()
  let date = new Date()
  date = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
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
    if (!name || !email || !fname || !dob || !mob || !add || !course || !profession || !schoolName || !employeeCompany) setError(true)
    else {
      if (!email.includes('@') || email.slice(email.length - 4, email.length) !== '.com') {
        setEmailErr(true)
      } else {
        if (mob.length == 10) {
          let result = await fetch(`${api_url}signup`, {
            method: 'post',
            body: JSON.stringify({ Created: date, Name: name, Email: email, FatherName: fname, DOB: dob, PhoneNo: mob, Address: add, Course: course, Profession: profession, SchoolName: schoolName, EmployeeCompany: employeeCompany, }),
            headers: { 'Content-Type': 'application/json' }
          })
          result = await result.json()
          if (result) {
            setTimeout(() => {
              navigate('/')
              setMsg(false)
            }, 4000)
            setMsg(true)
          }
        }
        else {
          setMobErr(true)
        }
      }
    }
  }

  function mobHandler(e) {
    setMob(e.target.value)
    if (mobErr === true) setMobErr(false)
  }

  function reset() {
    document.getElementById('courses').value = ""
    document.getElementById('profession').value = ""
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
    setError(false)
    setMobErr(false)
    setEmailErr(false)
  }
  useEffect(() => {
    if (profession === 'Student') {
      setEmployeeCompany('-')
      setSchoolName('')
    }
    else if (profession === 'Employee') {
      setSchoolName('-')
      setEmployeeCompany('')
    }
  }, [profession])
  return (
    <div className='main-wrapper'>
      <div className="background-img"></div>
      <div className="overlay"></div>
      <div className="signup-container" id='signup'>
        <div className="signup-header">
          <button className='back-button' onClick={() => navigate('/')}>
            &lArr;
          </button>
          <h1 className='signup-heading'>Sign up</h1>
        </div>
        <div className='form-group'>
          <input placeholder=" " className='form-control' value={name} onChange={(e) => setName(e.target.value)} type='text' />
          <label>Enter Name</label>
          {error && !name && <p className='error'>Please Enter Name</p>}
        </div>
        <div className='form-group'>
          <input placeholder=" " className='form-control' value={fname} onChange={(e) => setFname(e.target.value)} type='text' />
          <label>Enter Father's Name</label>
          {error && !fname && <p className='error'>Please Enter Father's Name</p>}
        </div>
        <div className='form-group'>
          <input placeholder=' ' className='form-control' value={dob} onChange={(e) => setDob(e.target.value)} type='date' />
          {error && !dob && <p className='error'>Please Enter Date Of Birth </p>}
        </div>
        <div className='form-group'>
          <input placeholder=" " className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
          <label>Enter Email</label>
          {error && !email && <p className='error'>Please Enter Email</p>}
          {emailErr && <p className='error'>Please Enter Valid Email</p>}
        </div>
        <div className='form-group'>
          <input placeholder=" " className='form-control' value={mob} onChange={mobHandler} type='number' />
          <label>Enter Contact No.</label>
          {error && !mob && <p className='error'>Please Enter Contact No.</p>}
          {mobErr && <p className='error'>Enter 10 Digit Contact No.</p>}
        </div>
        <div className='form-group'>
          <input placeholder=" " className='form-control' value={add} onChange={(e) => setAdd(e.target.value)} type='text' />
          <label>Enter Address</label>
          {error && !add && <p className='error'>Please Enter  Address</p>}
        </div>
        <div className='form-group'>
          <select id='courses' className='form-control dropdown-form-control' onChange={(e) => setCourse(e.target.value)}>
            <option value={''}>Courses</option>
            <option value={'Fullstack Web Developement'}>Fullstack Web Developement</option>
            <option value={'Frontend Web Developement'}>Frontend Web Developement</option>
            <option value={'Backend Web Developement'}>Backend Web Developement</option>
            <option value={'Cloud Engineering'}>Cloud Engineering</option>
          </select>
          {error && !course && <p className='error'>Please Select Course</p>}
        </div>
        <div>
          <select id='profession' className='form-control dropdown-form-control' onChange={(e) => setprofession(e.target.value)}>
            <option value=''>Are You a</option>
            <option value="Student">Student</option>
            <option value="Employee">Employee</option>
          </select>
          {error && !profession && <p className='error'>Please Select Profession</p>}
          {profession === 'Student' ?
            <div className="form-group">
              <input placeholder=" " className="form-control" type='text' value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
              <label>Enter School/College Name</label>
              {error && !schoolName && <p className='error'>Please Provide School/College Name </p>}
            </div>
            : profession === 'Employee' ?
              <div className="form-group">
                <input placeholder=" " className="form-control" type='text' value={employeeCompany} onChange={(e) => setEmployeeCompany(e.target.value)} />
                <label>Enter Working Company Name </label>
                {error && !employeeCompany && <p className='error'>Please Provide Employee Company </p>}
              </div>
              : null
          }
        </div>
        <div className='signup-button'>
          <button onClick={submit}>Submit</button>
          <button className="reset-btn" onClick={reset}>Reset</button>
        </div>
        <div>
          {msg && <h2>You Are Successfully Signup</h2>}
        </div>
      </div>
    </div>
  )
}

export default Signup