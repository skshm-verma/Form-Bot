import React, { useEffect, useState } from 'react'
import styles from './Workspace.module.css'
import WorkspaceNavbar from '../components/navbars/WorkspaceNavbar'
import { verifyUser } from '../helpers/api-communicator'

const Workspace = () => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        verifyUser()
            .then((response) => {
                setUsername(response.userName);
                setUserId(response.userId);
            })
            .catch((error) => console.error(error));
    }, [])
    return (
        <div className={styles.workspaceWrapper}>
            <nav className={styles.navContainer}>
                <WorkspaceNavbar type={"dropdown"} name={username} />
            </nav>
            <hr className={styles.partition}/>
        </div>
    )
}

export default Workspace
