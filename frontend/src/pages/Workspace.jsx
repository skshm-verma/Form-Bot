import React, { useEffect, useState, useCallback } from 'react'
import styles from './Workspace.module.css'
import WorkspaceNavbar from '../components/navbars/WorkspaceNavbar'
import { useAuth } from '../context/AllContext'
import { useNavigate } from 'react-router-dom'
import FolderChips from '../components/workspaceItems/FolderChips'
import FormChips from '../components/workspaceItems/FormChips'
import { createNewFolder, getAllFolders } from '../helpers/api-communicator'
import CreateModal from '../components/modals/CreateModal'

const Workspace = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [allFoldersNames, setAllFoldersNames] = useState([]);
    const [id, setId] = useState('');

    const handleCreateFolder = async () => {
        setFolderName('');
        setOpenModal(true);
    }

    useEffect(() => {
        const checkAuthStatus = async () => {
            const status = await auth?.checkAuthStatus();
            if (status === 401) {
                navigate('/');
            } else {
                setId(auth?.userId)
            }
        };
        checkAuthStatus();

        const createFolder = async () => {
            if (!openModal && folderName) {
                try {
                    const response = await createNewFolder(auth?.userId, folderName);
                    console.log(response);
                    if(response.msg == 'Duplicate value entered'){
                       alert('Folder with same name already present');
                    }
                    await fetchFolders();
                    setFolderName('');
                } catch (error) {

                    console.log(error);
                }
            }
        };
        createFolder();

        const fetchFolders = async () => {
            try {
                const response = await getAllFolders(id);
                if (response.status === 200) {
                    setAllFoldersNames(response.data.folderNames);
                } else {
                    console.log("Fetch Folders Function: ",response);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (id) {
            fetchFolders();
        }

    }, [auth, openModal, id])


    return (
        <div className={styles.workspace}>
            <nav className={styles.navContainer}>
                <WorkspaceNavbar type={"dropdown"} name={auth?.userName} />
            </nav>
            <hr className={styles.partition} />
            <div className={styles.itemsWrapper}>
                <div className={styles.folderContainer}>
                    <button className={styles.btn} onClick={handleCreateFolder}>
                        <img width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/add-folder.png" alt="add-folder" />
                        <span>Create a folder</span>
                    </button>
                    <div className={styles.folders}>
                        {allFoldersNames.map((name, index) => (
                            <FolderChips key={index} folderName={name} id={index} />
                        ))}
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.newForm} onClick={() => navigate('/workspace/newForm')}>
                        <img width="24" height="24" src="https://img.icons8.com/android/24/FFFFFF/plus.png" alt="plus" />
                        <span>
                            Create a typebot
                        </span>
                    </div>
                    <div className={styles.oldForms}>
                        {/* Call to get all the forms of a particular folder */}
                        <FormChips formName={"New Folder"} />
                        <FormChips formName={"New Folder"} />
                        <FormChips formName={"New Folder"} />
                        <FormChips formName={"New Folder"} />
                    </div>
                </div>
            </div>
            {openModal && <CreateModal option1={"Done"} option2={"Cancel"} requiredField={"New Folder"} setInputName={setFolderName} inputName={folderName} setOpenModal={setOpenModal} />}
        </div>
    )
}

export default Workspace
