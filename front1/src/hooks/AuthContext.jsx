import React, { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
import { navigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [jwt,setJWT] = useState(null);

    const registerAdmin = async (admin) =>{
        try{
            const response = await fetch('http://localhost:3000/admin/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(admin),
            });
            if (response.ok){
                console.log('Admin registered successfully');
                navigate('/admin/login');
            }
        } catch (error) {
            console.error('Error register admin',error);
        }
    }

     const loginAdmin = async (email, password) => {
        try {
            const response = await fetch('/api/admin/login', {
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
            const response = await fetch('/api/admin/auth', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                },
            });
            if (response.status === 200) {
                const adminData = await response.json();
                setAdmin(adminData);
                console.log('Admin authenticated successfully');
            } else {
                console.error('Failed to authenticate admin');
            }
        } catch (error) {
            console.error('Error authenticating admin:', error);
        }
    };

    useEffect(() => {
        if (jwt) {
            authAdmin();
        }
    }, [jwt]);

    return (
        <AuthContext.Provider value={{ admin, registerAdmin, loginAdmin, jwt }}>
            {children}
        </AuthContext.Provider>
    ); 


}