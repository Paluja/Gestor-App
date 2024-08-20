import  { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const navigate  = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [auth, setAuth] = useState(false);
    const [jwt,setJWT] = useState(null);

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
            }
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
                console.log('Admin logged in successfully');
                // Manejar el éxito del login, por ejemplo, guardar el JWT en el estado
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
                    'Authorization': `${jwt}`,
                },
            });
            if (response.status === 200) {
                const adminData = await response.json();
                setAdmin(adminData);
                console.log('Admin authenticated successfully');
                setAuth(true);
                // navigate('/admin/dashboard');
            } else {
                console.error('Failed to authenticate admin');
            }
        } catch (error) {
            console.error('Error authenticating admin:', error);
        }
    };

    const registerUser = async (name, password) =>{
        console.log('Registering user' , name, password);
        try{
            const response = await fetch('http://localhost:3000/user/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${jwt}`
                },
                body: JSON.stringify({name, password})
            });
            if (response.ok){
                const data = await response.json();
                console.log('User registered successfully', data.message);
            }
        } catch (error) {
            console.error('Error register user',error);
        }
    }

    useEffect(() => {
        if (jwt) {
            console.log(jwt);
            authAdmin();
        }
    }, [jwt]);

    return (
        <AuthContext.Provider value={{ admin, registerAdmin, loginAdmin, jwt, auth, registerUser }}>
            {children}
        </AuthContext.Provider>
    ); 

}

