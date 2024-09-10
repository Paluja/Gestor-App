import { useNavigate } from 'react-router-dom';

function SelectLogin() {
    const navigate = useNavigate();

    const handleAdminLogin = () => {
        navigate('/admin/login');
    };

    const handleUserLogin = () => {
        navigate('/user/login');
    };

    const handleRegisterAdmin = () => {
        navigate('/admin/register');
    };

    return (
        <>
            <div className='loginSelection-container'>
                <div className="btn-login">
                    <button className='btn-admin' onClick={handleAdminLogin}>Login as Admin</button>
                    <button className='btn-user' onClick={handleUserLogin}>Login as User</button>
                </div>
                <p className='register-container' onClick={handleRegisterAdmin}>Register as new Admin</p>
            </div>
        </>
    );
}

export default SelectLogin;