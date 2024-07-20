import React from 'react'
import styles from './LandingPage.module.css'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className={styles['wrapper-container']}>
            <h1>Lading Page</h1>
            <button onClick={() => navigate("/signin")}>SignIn</button>
            <button onClick={() => navigate("/signup")}>Create a FormBot</button>
        </div>
    )
}

export default Dashboard
