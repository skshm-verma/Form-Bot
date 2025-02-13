import axios from 'axios'


const signUpUser = async (name, email, password) => {
    try {
        const response = await axios.post('/user/signUp', { name, email, password });
        return response;
    } catch (error) {
        return error.response?.data;
    }
}

const signInUser = async (email, password) => {
    try {
        const response = await axios.post('/user/signIn', { email, password });
        return response;
    } catch (error) {
        return error.response?.data;
    }
}

const verifyUser = async () => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get('/user/verify', config);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

const updateUserDetails = async (userId, newUserName, newEmail, oldPassword, newPassword) => {
    try {
        const response = await axios.patch('/user/updateUserDetails', { userId, userName: newUserName, email: newEmail, oldPassword, newPassword })
        return response.data;
    } catch (error) {
        return error.response;
    }
}


const createNewFolder = async (userId, folderName) => {
    try {
        const response = await axios.post('/workspace/newFolder', { userId, folderName })
        return response;
    } catch (error) {
        return error.response.data;
    }
}

const getAllFolders = async (userId) => {
    try {
        const response = await axios.get('/workspace/allFolders', { params: { userId } })
        return response;
    } catch (error) {
        return error.response;
    }
}


const getAllForms = async (folderId) => {
    try {
        const response = await axios.get('/workspace/allForms', { params: { folderId } });
        return response;
    } catch (error) {
        return error.response;
    }
}

const updateFormData = async (formId, fields, title) => {
    try {
        const response = await axios.patch('/workspace/updateFormData', { formId, fields, title });
        return response;
    } catch (error) {
        return error.response;
    }
}

const updateFormTheme = async (formId, theme) => {
    try {
        const response = await axios.patch('/workspace/updateFormTheme', { formId, theme });
        return response;
    } catch (error) {
        return error.response;
    }
}

const createNewTypeBot = async (userId, formName, formFields, folderId, theme) => {
    try {
        const formData = {
            userId,
            title: formName,
            folderId,
            fields: formFields,
            theme
        };
        const response = await axios.post('/workspace/newForm', formData);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

const deleteFolder = async (folderId) => {
    try {
        const response = await axios.delete('/workspace/deleteFolder', { params: { folderId } });
        return response;
    } catch (error) {
        return error.response;
    }
}

const deleteForm = async (formId) => {
    try {
        const response = await axios.delete('/workspace/deleteForm', { params: { formId } });
        return response;
    } catch (error) {
        return error.response;
    }
}

const getFormIdByName = async (formName) => {
    try {
        const response = await axios.get('/workspace/getFormId', { params: { formName } })
        return response;
    } catch (error) {
        return error.response;
    }
}

const getAllFormData = async (formId) => {
    try {
        const response = await axios.get('/workspace/formDetails', { params: { formId } })
        return response.data;
    } catch (error) {
        return error.response;
    }
}

const updateFormViews = async (formId, views) => {
    try {
        const response = await axios.patch('/workspace/updateFromViews', { formId, views })
        return response;
    } catch (error) {
        return error.response;
    }
}

const createUserInput = async (formId, date, labelName, response) => {
    try {
        const data = await axios.post('/workspace/publicInput', { formId, date, labelName, response })
        return data;
    } catch (error) {
        return error.response;
    }
}


export {
    signUpUser,
    signInUser,
    verifyUser,
    updateUserDetails,
    createNewFolder,
    getAllFolders,
    getAllForms,
    updateFormData,
    updateFormTheme,
    createNewTypeBot,
    deleteFolder,
    deleteForm,
    getFormIdByName,
    getAllFormData,
    createUserInput,
    updateFormViews
};