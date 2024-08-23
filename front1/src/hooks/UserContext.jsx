import  { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const AuthUserContext = createContext({});

export const useAuthUser = () => {
    return useContext(AuthUserContext);
};

export const AuthUserProvider = ({ children }) => {
    // const navigate  = useNavigate();
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(false);
    const [jwtUser,setJWT] = useState(null);
    

    const loginUser = async (name, password) => {
        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });
            if (response.status === 200) {
                const data = await response.json();
                setJWT(data.jwt);
                console.log('User logged in successfully');
                // Manejar el éxito del login, por ejemplo, guardar el JWT en el estado
            } else {
                console.error('Failed to login user');
            }
        } catch (error) {
            console.error('Error logging in user:', error);
        }
    }

    const authUser = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/auth', {
                method: 'GET',
                headers: {
                    'Authorization': jwtUser,
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                setUser(data);
                setAuth(true);
                console.log('User authenticated successfully');
            } else {
                console.error('Failed to authenticate user');
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
        }
    }

    const getAllUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/all', {
                method: 'GET',
                headers: {
                    'Authorization': jwtUser,
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                return data;
            } else {
                console.error('Failed to get users');
            }
        } catch (error) {
            console.error('Error getting users:', error);
        }
    }
    
    const logOutUser = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/logout', {
                method: 'POST',
                headers: {
                    'Authorization': jwtUser,
                },
            });
            if (response.status === 200) {
                setJWT(null);
                setUser(null);
                setAuth(false);
                console.log('User logged out successfully');
            } else {
                console.error('Failed to logout user');
            }
        } catch (error) {
            console.error('Error logging out user:', error);
        }
    }

    useEffect(() => {
        if (jwtUser) {
            authUser();
        }
    }, [jwtUser]);

    return (
        <AuthUserContext.Provider value={{ user, auth, loginUser, jwtUser,authUser, getAllUsers, logOutUser }}>
            {children}
        </AuthUserContext.Provider>
    );


};