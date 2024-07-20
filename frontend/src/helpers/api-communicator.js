import axios from 'axios'

const signInUser = async (email, password) => {
    try {
        const response = await axios.post('/user/signIn', {email , password});
        return response;
    } catch (error) {
        console.log("Error SignIn",error);
        return error.response.data;
    }
}


export { signInUser } ;