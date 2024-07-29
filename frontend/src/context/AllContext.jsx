import React, { useState, createContext, useContext } from 'react';
import { verifyUser } from '../helpers/api-communicator';

const AuthContext = React.createContext(null);
const FormUpdateContext = React.createContext(null);

const ContextProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [formName, setFormName] = useState('');
    const [formFields, setFormFields] = useState('');
    const [folderId, setFolderId] = useState('');
    const [formId, setFormId] = useState('');
    const [formTheme, setFormTheme] = useState('light')


    const checkAuthStatus = async () => {
        const data = await verifyUser();

        if (data.status !== 401) {
            setUserName(data.userName);
            setUserId(data.userId);
            return 200;
        } else {
            return data.status;
        }
    }

    const saveFormValues = (formName, formFields, folderId) => {
        setFormName(formName);
        setFormFields(formFields);
        setFolderId(folderId);
    }

    const saveFormId = (formId) => {
        setFormId(formId);
    }

    const saveFormTheme = (theme) => {
        setFormTheme(theme);
    }

    // const saveFolderId = (folderId) => {
    //     setFolderId(folderId);
    // }

    const resetFormValues = () => {
        setFormName('');
        setFormFields('');
        setFolderId('');
        setFormId('');
        setFormTheme('light');
    };
    
    const authValues = {
        userName,
        userId,
        checkAuthStatus
    };

    const formValues = {
        saveFormValues,
        formName,
        formFields,
        folderId,
        // saveFolderId,
        saveFormId,
        formId,
        saveFormTheme,
        formTheme,
        resetFormValues
    }

    return <AuthContext.Provider value={authValues}>
        <FormUpdateContext.Provider value={formValues}>
            {children}
        </FormUpdateContext.Provider>
    </AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export const useForm = () => useContext(FormUpdateContext);
export default ContextProvider;