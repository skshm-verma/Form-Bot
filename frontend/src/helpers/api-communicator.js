import axios from 'axios'


const signUpUser = async (name, email, password) => {
    try {
        const response = await axios.post('/user/signUp', (name, email, password));
        return response;
        console.log(response);
    } catch (error) {
        console.log("Error SignUp: ", error);
        return error.response.data;
    }
}

const signInUser = async (email, password) => {
    try {
        const response = await axios.post('/user/signIn', { email, password });
        return response;
    } catch (error) {
        // console.log("Error SignIn",error);
        return error.response.data;
    }
}


export { signInUser };