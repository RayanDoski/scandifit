import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = process.env.REACT_APP_API_URL

const useAuthCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/protected`, {
                    method: 'GET',
                    credentials: 'include'  // Include credentials (cookies)
                });
                const data = await response.json();
                if (!data.success) {
                    navigate('/login');
                }
            } catch (error) {
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);  // Include navigate in dependency array
};

export default useAuthCheck;