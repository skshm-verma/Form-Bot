import React, { useEffect, useState, useCallback } from 'react'
import styles from './Workspace.module.css'
import WorkspaceNavbar from '../components/navbars/WorkspaceNavbar'
import { useAuth } from '../context/AllContext'
import { useNavigate } from 'react-router-dom'
import FolderChips from '../components/workspaceItems/FolderChips'
import FormChips from '../components/workspaceItems/FormChips'
import { createNewFolder, getAllFolders, getAllForms } from '../helpers/api-communicator'
import CreateModal from '../components/modals/CreateModal'

const Workspace = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [allFoldersNames, setAllFoldersNames] = useState([]);
    const [allFormsNames, setAllFormsNames] = useState([]);
    const [openedFolders, setOpenedFolders] = useState(new Set());
    

    const handleCreateFolder = async () => {
        setFolderName('');
        setOpenModal(true);
    }

    const handleGetAllForms = async (folderId) => {
        if (openedFolders.has(folderId)) {
            const response = await getAllForms(folderId);
            const formNames = response.data.formNames;
            setAllFormsNames(prevForms => prevForms.filter(form => !formNames.includes(form)));
        } else {
            const response = await getAllForms(folderId);
            const formNames = response.data.formNames;
            setAllFormsNames(prevForms => [...prevForms, ...formNames]);
        }
    }

    const handleFolderClick = (folderId) => {
        setOpenedFolders(prevFolders => {
            const newFolders = new Set(prevFolders);
            if (newFolders.has(folderId)) {
                newFolders.delete(folderId);
            } else {
                newFolders.add(folderId);
            }
            return newFolders;
        });
    };


    const handleCreateTypebot = () => {
        const openedFoldersArray = Array.from(openedFolders);
        if (openedFoldersArray.length > 1) {
            alert('Multiple folders are selected');
        } else if (openedFoldersArray.length === 1) {
            navigate('/workspace/newForm', { state: { folderId: openedFoldersArray[0] } });
        } else {
            navigate('/workspace/newForm');
        }
    };
    useEffect(() => {
        const checkAuthStatus = async () => {
            const status = await auth?.checkAuthStatus();
            if (status === 401) {
                navigate('/');
            }
        };
        checkAuthStatus();

        const createFolder = async () => {
            if (!openModal && folderName) {
                try {
                    const response = await createNewFolder(auth?.userId, folderName);
                    if (response.msg == 'Duplicate value entered') {
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
                const response = await getAllFolders(auth?.userId);
                const folders = response.data.folders;
                setAllFoldersNames(folders);
                const mainFolder = folders.find(folder => folder.name === "main");
                if (mainFolder) {
                    const response = await getAllForms(mainFolder.id);
                    setAllFormsNames(response.data.formNames);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (auth?.userId) {
            fetchFolders();
        }

    }, [auth, openModal])


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
                        {allFoldersNames
                            ?.filter(folder => folder.name !== "main")
                            ?.map((folder, index) => (
                                <FolderChips
                                    key={index}
                                    folderName={folder.name}
                                    id={folder.id}
                                    onClick={() => {
                                        handleFolderClick(folder.id);
                                        handleGetAllForms(folder.id);
                                    }}
                                    className={openedFolders.has(folder.id) ? styles.selectedFolder : ''}
                                />
                            ))}
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.newForm} onClick={handleCreateTypebot}>
                        <img width="24" height="24" src="https://img.icons8.com/android/24/FFFFFF/plus.png" alt="plus" />
                        <span>
                            Create a typebot
                        </span>
                    </div>
                    <div className={styles.oldForms}>
                        {allFormsNames?.map((name, index) => (
                            <FormChips key={index} formName={name} />
                        ))}
                    </div>
                </div>
            </div>
            {openModal && <CreateModal option1={"Done"} option2={"Cancel"} requiredField={"New Folder"} setInputName={setFolderName} inputName={folderName} setOpenModal={setOpenModal} />}
        </div>
    )
}

export default Workspace
