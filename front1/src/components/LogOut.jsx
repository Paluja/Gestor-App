import React from 'react'
import { useAuthUser } from '../hooks/UserContext';
import { useAuth } from '../hooks/AuthAdminContext';
import { useNavigate } from 'react-router-dom';

function LogOut() {
    const navigate = useNavigate();
    const { jwtAdmin, logOutAdmin } = useAuth();
    const { jwtUser, logOutUser } = useAuthUser();

    const handleLogOut = async () => {
      if (jwtAdmin){
        try {
          await logOutAdmin();
          navigate('/admin/login');
        } catch (error) {
          console.error('Failed to logout admin',error);
        }
      } else if (jwtUser){
        try {
          await logOutUser();
          navigate('/user/login');
        } catch (error) {
          console.error('Failed to logout user',error);
        }
      } else {
        console.error('No user or admin logged in');
      }
    }

    return (
    <>
      <button onClick={handleLogOut}>Log out</button>
    </>
  )
}

export default LogOut