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
        const response = await axios.post('/workspace/newFolder', {userId , folderName})
        console.log("Response Data: ", response)
        return response;
    } catch (error) {
        return error.response;
    }
}


export { signUpUser, signInUser, verifyUser, createNewFolder };