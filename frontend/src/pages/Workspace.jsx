import React, { useEffect, useState } from 'react'
import styles from './Workspace.module.css'
import WorkspaceNavbar from '../components/navbars/WorkspaceNavbar'
import { useAuth } from '../context/AllContext'
import { useNavigate } from 'react-router-dom'
import FolderChips from '../components/workspaceItems/FolderChips'
import FormChips from '../components/workspaceItems/FormChips'

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
        <div className={styles.workspace}>
            <nav className={styles.navContainer}>
                <WorkspaceNavbar type={"dropdown"} name={auth?.userName} />
            </nav>
            <hr className={styles.partition} />
            <div className={styles.itemsWrapper}>
                <div className={styles.folderContainer}>
                    <button className={styles.btn}>
                        <img width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/add-folder.png" alt="add-folder" />
                        <span>Create a folder</span>
                    </button>
                    <div className={styles.folders}>
                        {/* A call to get all folder should be made here */}
                        <FolderChips folderName={"Computer Networks"} />
                        <FolderChips folderName={"Computer Networks"} />
                        <FolderChips folderName={"Computer Networks"} />
                        <FolderChips folderName={"Computer Networks"} />
                        <FolderChips folderName={"Computer Networks"} />
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.newForm}>
                        <img width="24" height="24" src="https://img.icons8.com/android/24/FFFFFF/plus.png" alt="plus" />
                        <span>
                            Create a typebot
                        </span>
                    </div>
                    <div className={styles.oldForms}>
                        {/* Call to get all the forms of a particular folder */}
                        <FormChips formName={"New Folder"}/>
                        <FormChips formName={"New Folder"}/>
                        <FormChips formName={"New Folder"}/>
                        <FormChips formName={"New Folder"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workspace
