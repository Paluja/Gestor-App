import React from 'react'
import { useAuthUser } from '../hooks/UserContext';
import { useAuth } from '../hooks/AuthAdminContext';
import { useNavigate } from 'react-router-dom';

function LogOut() {
    const navigate = useNavigate();

    const { jwtAdmin, logOutAdmin } = useAuth();
    // const { jwtUser, logOutUser } = useAuthUser();

    console.log('JWTAdmin', jwtAdmin);
    // console.log('JWTUser', jwtUser);

    const handleLogOut = async () => {
      
        try {
          await logOutAdmin();
          navigate('/');
        } catch (error) {
          console.error('Failed to logout admin',error);
        }
    }

    return (
    <>
      <button onClick={handleLogOut}>Log out</button>
    </>
  )
}

export default LogOut