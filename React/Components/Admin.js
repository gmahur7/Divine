import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

function Admin() {
    const navigate = useNavigate()
    if (isTokenExpired()) {
        // Clear the token from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('admin')
        // Redirect to the login page
        window.location.href = '/adminlogin'; // You might use React Router's history.push() for navigation
      }
      
      function isTokenExpired() {
        const token = localStorage.getItem('token');
        if (!token) return true; // Token not found
        const decoded = jwtDecode(token); // Function to decode the token
        const currentTime = Date.now() / 1000; // Get current time in seconds
        return decoded.exp < currentTime; // Check if token expiration time is in the past
      }

    const [data, setData] = useState('')
    const [type, setType] = useState('Name')
    const [value, setValue] = useState('')
    const [err, setErr] = useState('')
    const [date, setDate] = useState('')
    const [date2, setDate2] = useState('')
    const [pop, setPop] = useState('none')
    const [id, setId] = useState('')
    function logout() {
        localStorage.removeItem('admin')
        localStorage.removeItem('token')
        navigate('/adminlogin')
    }
    function typeHandler(e) {
        setType(e.target.value)
        setValue('')
    }

    const filter = async (e) => {
        let result = await fetch(`http://localhost/search/${type}/${value}`, {
            method: 'get',
            headers: {
                Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        if (result.err) setErr(result.err)
        else setData(result)
    }
    const filter2 = async () => {
        let gt = date.split('-')
        gt = `${gt[0]}${gt[1]}${gt[2]}`
        if (type === 'FromDateToDate') {
            let lt = date2.split('-')
            lt = `${lt[0]}${lt[1]}${lt[2]}`
            let result = await fetch('http://localhost/search/Created/btw', {
                method: 'post',
                body: JSON.stringify({ gt, lt }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json()
            if (result.error) setErr(result.err)
            else setData(result)
        }
        else {
            let result = await fetch(`http://localhost/search/Created/${gt}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json()
            if (result.error) setErr(result.err)
            else setData(result)

        }
    }
    const update = async (id, action) => {
        if (action === 'true') {
            let result = await fetch(`http://localhost/update/${id}`, {
                method: 'put',
                body: JSON.stringify({ Admission: 'true' }),
                headers: { 'Content-Type': 'application/json',
                            Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = result.json()
            if (result.acknowledged === true) getdata()
        }
        else {
            let result = await fetch(`http://localhost/update/${id}`, {
                method: 'put',
                body: JSON.stringify({ Admission: 'false' }),
                headers: { 'Content-Type': 'application/json',
                Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
             }
            })
            result = result.json()
            if (result.acknowledged === true) getdata()
        }
        setPop('none')
        setId('')
    }
    function popup(_id) {
        setPop('block')
        setId(_id)
    }
    async function getdata() {
        let result = await fetch('http://localhost/', {
            method: 'get',
            headers: { Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
        })
        result = await result.json()
        if(result.error) setErr(true)
        else setData(result)
    }
    useEffect(() => {
        getdata()
    }, [])
    useEffect(() => {
        getdata()
    }, [id])
    useEffect(() => {
        if (value.length < 1) getdata()
        else filter()
    }, [value])
    return (
        <div>
            <div>
                <input type='text' onChange={(e) => setValue(e.target.value)} value={value} placeholder={`Search By ${type}`} />
                <select onChange={typeHandler}>
                    <option value={'Name'}>Name</option>
                    <option value={'Course'}>Course</option>
                    <option value={'Profession'}>Profession</option>
                    <option value={'Admission'}>Admission</option>
                    <option value={'Date'}>Date</option>
                    <option value={'FromDateToDate'}>FromDateToDate</option>
                </select>
                {type === 'FromDateToDate' ?
                    <div>
                        <span>From : </span>
                        <input type='date' onChange={(e) => setDate(e.target.value)} />
                        <span> To : </span>
                        <input type='date' onChange={(e) => setDate2(e.target.value)} />
                        <button onClick={filter2}>Search</button>
                    </div>
                    : type === 'Date' ? <div>
                        <span>From : </span>
                        <input type='date' onChange={(e) => setDate(e.target.value)} />
                        <button onClick={filter2}>Search</button>
                    </div> : null
                }
            </div>
            <button onClick={logout}>Logout</button>
            {data ? <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Fathers Name</th>
                        <th>D.O.B</th>
                        <th>Email</th>
                        <th>Contact No.</th>
                        <th>Address</th>
                        <th>Course</th>
                        <th>Profession</th>
                        <th>School Name</th>
                        <th>Employee Company</th>
                        <th>Created</th>
                        <th>Admission</th>
                    </tr>
                </thead>
                {<tbody>
                    {data.map((value, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{value.Name}</td>
                            <td>{value.FatherName}</td>
                            <td>{value.DOB}</td>
                            <td>{value.Email}</td>
                            <td>{value.PhoneNo}</td>
                            <td>{value.Address}</td>
                            <td>{value.Course}</td>
                            <td>{value.Profession}</td>
                            <td>{value.SchoolName}</td>
                            <td>{value.EmployeeCompany}</td>
                            <td>{`${value.Created.slice(6, 8)}-${value.Created.slice(4, 6)}-${value.Created.slice(0, 4)}`}</td>
                            <td>{value.Admission}</td>
                            <td><button onClick={() => popup(value._id)}>Update</button></td>
                        </tr>
                    )}
                </tbody>}
            </table> :
                null}
            <div style={{ display: pop }}>
                <h1>Admission</h1>
                <button onClick={() => update(id, 'true')}>True</button>
                <button onClick={() => update(id, 'false')}>False</button>
            </div>
            {err && <h1>{err}</h1>}
        </div>
    )
}

export default Admin;