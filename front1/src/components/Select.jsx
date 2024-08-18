import { useNavigate } from 'react-router-dom';

function Select() {
    const navigate = useNavigate();

    const handleAdminLogin = () => {
        navigate('/admin/login');
    };

    const handleUserLogin = () => {
        navigate('/user/login');
    };

    return (
        <>
            <div>
                <button className='btn-admin' onClick={handleAdminLogin}>Login as Admin</button>
                <button className='btn-user' onClick={handleUserLogin}>Login as User</button>
                <p>Register as new Admin</p>
            </div>
        </>
    );
}

export default Select;