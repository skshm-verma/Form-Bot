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

const createNewTypeBot = async (userId, formName, formFields, folderId) => {
    try {
        const cleanedFields = formFields.map(({ icon, placeholder, ...rest }) => rest);
        const formData = {
            userId,
            title: formName,
            folderId,
            fields: cleanedFields
        };
        const response = await axios.post('/workspace/newForm', formData);
        console.log("response data in api : ", response);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

const getAllFormFieldData = async (formId) => {
    try {
        const response = await axios.get('/workspace/formFieldDetails', { params: { formId } } )
        return response.data;
    } catch (error) {
        return error.response;
    }
}

const updateFormViews = async (formId, views) => {
    try{
       const response = await axios.patch('/workspace/updateFromViews', { formId, views })
       return response;
    }catch(error){
        return error.response;
    }
}

const createUserInput = async ( formId, date, labelName, response) => {
    try{
       const data = await axios.post('/workspace/publicInput', { formId, date, labelName, response })
       return data;
    }catch(error){
        return error.response;
    }
} 


export {
    signUpUser,
    signInUser,
    verifyUser,
    createNewFolder,
    getAllFolders,
    getAllForms,
    createNewTypeBot,
    getAllFormFieldData,
    createUserInput,
    updateFormViews
};