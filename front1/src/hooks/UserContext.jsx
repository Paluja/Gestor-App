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
    const [jwt,setJWT] = useState(null);
    

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
                    'Authorization': jwt,
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


    useEffect(() => {
        if (jwt) {
            authUser();
        }
    }, [jwt]);

    return (
        <AuthUserContext.Provider value={{ user, auth, loginUser, authUser }}>
            {children}
        </AuthUserContext.Provider>
    );


};