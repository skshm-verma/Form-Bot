import React, { useEffect, useState } from 'react'
import WorkspaceNavbar from '../components/navbars/WorkspaceNavbar'
import { useAuth, useForm } from '../context/AllContext'
import { useNavigate } from 'react-router-dom'
import FolderChips from '../components/workspaceItems/FolderChips'
import FormChips from '../components/workspaceItems/FormChips'
import { createNewFolder, getFormIdByName, getAllFolders, getAllForms, deleteFolder, deleteForm } from '../helpers/api-communicator'
import CreateModal from '../components/modals/CreateModal'
import Mark from '../assets/mark.png';
import styles from './Workspace.module.css'

const Workspace = () => {
    const auth = useAuth();
    const form = useForm();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [modalMode, setModalMode] = useState('create');
    const [itemToDelete, setItemToDelete] = useState(null);
    const [allFoldersNames, setAllFoldersNames] = useState([]);
    const [allFormsNames, setAllFormsNames] = useState([]);
    const [openedFolders, setOpenedFolders] = useState(new Set());
    const [duplicateError, setDuplicateError] = useState(false);
    const [multiSelectionError, setMultiSelectionError] = useState(false);
    const [notFoundError, setNotFoundError] = useState(false);

    const handleCreateFolder = async () => {
        setFolderName('');
        setModalMode('create');
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
            setMultiSelectionError(true);
            setTimeout(() => setMultiSelectionError(false), 800)
        } else if (openedFoldersArray.length === 1) {
            navigate('/workspace/newForm', { state: { folderId: openedFoldersArray[0] } });
        } else {
            navigate('/workspace/newForm');
        }
    };

    const handleFormClick = async (formName) => {
        const response = await getFormIdByName(formName);
        if (response) {
            navigate('/workspace/newForm', { state: { formId: response.data.formId } });
        } else {
            setNotFoundError(true);
            setTimeout(() => setNotFoundError(false), 800)
        }
    };

    const handleDeleteFolder = async (folderId) => {
        setModalMode('delete');
        setItemToDelete({ type: 'folder', id: folderId });
        setOpenModal(true);
    };

    const handleDeleteForm = async (formName) => {
        const response = await getFormIdByName(formName);
        if (response) {
            setModalMode('delete');
            setItemToDelete({ type: 'form', id: response.data.formId, name: formName });
            setOpenModal(true);
        }
    };

    const confirmDelete = async () => {
        try {
            if (itemToDelete.type === 'folder') {
                await deleteFolder(itemToDelete.id);
                setAllFoldersNames(prevFolders => prevFolders.filter(folder => folder.id !== itemToDelete.id));
                setOpenedFolders(prevFolders => {
                    const newFolders = new Set(prevFolders);
                    newFolders.delete(itemToDelete.id);
                    return newFolders;
                });
            } else if (itemToDelete.type === 'form') {
                await deleteForm(itemToDelete.id);
                setAllFormsNames(prevForms => prevForms.filter(form => form !== itemToDelete.name));
            }
            setItemToDelete(null);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            const status = await auth?.checkAuthStatus();
            if (status === 401) {
                navigate('/');
            }
        };
        checkLoginStatus();

        const createFolder = async () => {
            if (!openModal && folderName) {
                try {
                    const response = await createNewFolder(auth?.userId, folderName);
                    if (response.msg == 'Duplicate value entered') {
                        setDuplicateError(true);
                        setTimeout(() => setDuplicateError(false), 800)
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
            form?.resetFormValues();
            form?.saveFormId('')
            fetchFolders();
        }

    }, [auth, openModal])

    const getRequiredField = () => {
        if (itemToDelete?.type === 'folder') {
            return 'Folder';
        } else if (itemToDelete?.type === 'form') {
            return 'Form';
        }
        return 'New Folder';
    };

    return (
        <div className={styles.workspace} id="style-1">
            <nav className={styles.navContainer}>
                <WorkspaceNavbar type={"dropdown"} name={auth?.userName} />
            </nav>
            <hr className={styles.partition} />
            <div className={styles.itemsWrapper}>
                <div className={styles.folderContainer}>
                    <div className={styles.btn} onClick={handleCreateFolder}>
                        <div><img width="22" height="22" src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/add-folder.png" alt="add-folder" /></div>
                        <span>Create a folder</span>
                    </div>
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
                                    onDelete={handleDeleteFolder}
                                    className={openedFolders.has(folder.id) ? styles.selectedFolder : ''}
                                />
                            ))}
                    </div>
                </div>
                <div className={styles.formContainer} id="style-1">
                    <div className={styles.newForm} onClick={handleCreateTypebot}>
                        <img width="24" height="24" src="https://img.icons8.com/android/24/FFFFFF/plus.png" alt="plus" />
                        <span>
                            Create a typebot
                        </span>
                    </div>
                    <div className={styles.oldForms}>
                        {allFormsNames?.map((name, index) => (
                            <FormChips
                                key={index}
                                formName={name}
                                onClick={() => handleFormClick(name)}
                                onDelete={handleDeleteForm}
                            />
                        ))}
                    </div>
                </div>
                {duplicateError && <div className={styles.toastDivWorkspace}>
                    <img src={Mark} alt="markIcon" />
                    <span>Folder Already Present</span>
                </div>}
                {multiSelectionError && <div className={styles.toastDivWorkspace}>
                    <img src={Mark} alt="markIcon" />
                    <span>Multiple Folders Selected</span>
                </div>
                }
                {notFoundError && <div className={styles.toastDivWorkspace}>
                    <img src={Mark} alt="markIcon" />
                    <span>Form Not Found</span>
                </div>
                }
            </div>
            {openModal &&
                <CreateModal
                    option1={"Done"}
                    option2={"Cancel"}
                    requiredField={getRequiredField()}
                    setInputName={setFolderName}
                    inputName={folderName}
                    setOpenModal={setOpenModal}
                    onConfirm={modalMode === 'create' ? null : confirmDelete}
                    mode={modalMode}
                />}
        </div>
    )
}

export default Workspace
