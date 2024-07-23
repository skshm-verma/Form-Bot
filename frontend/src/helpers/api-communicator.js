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

const createNewTypeBot = async (userId,formName, formFields, folderId) => {
    try {
        const cleanedFields = formFields.map(({ label, icon, placeholder, ...rest }) => rest);
        console.log("Here")
        const formData = {
            userId,
            title: formName,
            folderId,
            fields: cleanedFields
        };
        console.log("Here")

        const response = await axios.post('/workspace/newForm', formData);
        console.log("response data : ", response);
        return response.data;
    } catch (error) {
        return error.response;
    }
}


export { signUpUser, signInUser, verifyUser, createNewFolder, getAllFolders, getAllForms, createNewTypeBot };