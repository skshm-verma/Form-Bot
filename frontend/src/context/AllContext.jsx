import React, { useState, createContext, useContext } from 'react';
import { verifyUser } from '../helpers/api-communicator';

const AuthContext = createContext(null);

 const ContextProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkAuthStatus = async () => {
        const data = await verifyUser();

        if (data) {
            setIsLoggedIn(true);
            setUserName(data.userName);
            setUserId(data.userId);
            return 200;
        } else {
            setIsLoggedIn(false);
            return 401;
        }
    }

    // const logout = async () => {
    //     try {

    //         const data = await logoutUser();
    //         setIsLoggedIn(false);
    //         setUser(null);
    //         window.location.reload();
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    const authValues = {
        userName,
        userId,
        isLoggedIn,
        checkAuthStatus
    };

    return <AuthContext.Provider value={authValues}>
        {children}
    </AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default ContextProvider;