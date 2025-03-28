import  { createContext, useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const navigate  = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [auth, setAuth] = useState(window.localStorage.getItem('auth') || null);
    const [jwtAdmin,setJWT] = useState(null);

    const registerAdmin = async (name, password, email) =>{
        console.log('Registering admin' , name, password, email);
        try{
            const response = await fetch('http://localhost:3000/admin/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, password, email})
            });
            if (response.ok){
                const data = await response.json();
                console.log('Admin registered successfully', data.message);
                navigate('/admin/login');
            } else if (response.status === 400) return false;
        } catch (error) {
            console.error('Error register admin',error);
        }
    }

     const loginAdmin = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3000/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.status === 200) {
                const data = await response.json();
                setJWT(data.jwt);
                localStorage.setItem('jwtToken', data.jwt);
                console.log(data.jwt);
                console.log('Admin logged in successfully');
            } else {
                console.error('Failed to login admin');
            }
        } catch (error) {
            console.error('Error logging in admin:', error);
        }
    };

    const authAdmin = async () => {
        try {
            const response = await fetch('http://localhost:3000/admin/auth', {
                method: 'GET',
                headers: {
                    'Authorization': jwtAdmin,
                },
            });
            if (response.status === 200) {
                const adminData = await response.json();
                setAdmin(adminData);
                setAuth(true);
                console.log('Admin authenticated successfully');
               
            } else {
                console.error('Failed to authenticate admin');
            }
        } catch (error) {
            console.error('Error authenticating admin:', error);
        }
    };

    const registerUser = async (name, password) =>{
        try{
            const response = await fetch('http://localhost:3000/user/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${jwtAdmin}`
                },
                body: JSON.stringify({name, password})
            });
            console.log('response',response);
            if (response.ok){
                const data = await response.json();
                console.log('User registered successfully', data.message);
            } else if (response.status === 400){
                return false;
            }
        } catch (error) {
            console.error('Error register user',error);
        }
    }

    const logOutAdmin = async () => {
        try {
            const response = await fetch('http://localhost:3000/admin/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `${jwtAdmin}`,
                },
            });
            if (response.status === 200) {
                setJWT(null);
                setAdmin(null);
                setAuth(false);
                localStorage.removeItem('jwtToken');
                console.log('Admin logged out successfully');
            } else {
                console.error('Failed to logout admin');
            }
        } catch (error) {
            console.error('Error logging out admin:', error);
        }
    }
    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setJWT(storedToken);
        } else {
            setAuth(false); // Asegura que si no hay token, auth sea false
        }
    }, []);
    
    useEffect(() => {
        if (jwtAdmin) {
            authAdmin();
        } else {
            setAuth(false); // Establece auth como false si no hay jwtAdmin
        }
    }, [jwtAdmin]);
    return (
        <AuthContext.Provider value={{ admin, registerAdmin, loginAdmin, logOutAdmin,jwtAdmin, auth, registerUser }}>
            {children}
        </AuthContext.Provider>
    ); 

}

