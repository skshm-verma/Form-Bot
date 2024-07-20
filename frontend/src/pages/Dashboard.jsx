import React from 'react'
import styles from './Dashboard.module.css'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className='wrapper-container'>
            <h1>Dashboard</h1>
            <button onClick={() => navigate("/signin")}>SignIn</button>
            <button onClick={() => navigate("/signup")}>Create a FormBot</button>
        </div>
    )
}

export default Dashboard
