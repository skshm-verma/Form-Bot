import React, { useEffect, useState } from 'react'
import styles from './Workspace.module.css'
import WorkspaceNavbar from '../components/navbars/WorkspaceNavbar'
import { useAuth } from '../context/AllContext'
import { useNavigate } from 'react-router-dom'

const Workspace = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            const status = await auth?.checkAuthStatus();
            if (status === 401) {
                navigate('/');
            }
        };
        checkAuthStatus();
    }, [auth])
    return (
        <div className={styles.workspaceWrapper}>
            <nav className={styles.navContainer}>
                <WorkspaceNavbar type={"dropdown"} name={auth?.userName} />
            </nav>
            <hr className={styles.partition} />
        </div>
    )
}

export default Workspace
