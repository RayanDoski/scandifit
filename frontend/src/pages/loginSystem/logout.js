import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutUser = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const Logout = async () => {
            const response = await fetch('http://127.0.0.1:8000/logout', {
                method: 'POST',
                credentials: 'include'  // Include credentials (cookies)
            });
            const data = await response.json();
            if (data.success) {
                navigate('/');
            }
        };
        Logout();
    }, [navigate]);  // Include navigate in dependency array
};

export default LogoutUser;