import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '../api/api';
import { setUser, setIsAuthenticated } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

export const useFetchUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token exists:', !!token);

            if(!token) return
            
            if (token) {
                console.log('Fetching user data...');
                const response = await api.get('/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('User data response:', response.data);
                
                if (response.data.data) {
                    dispatch(setUser(response.data.data));
                    dispatch(setIsAuthenticated(true));
                    console.log('User data set in Redux');
                } else {
                    console.error('No user data in response');
                    dispatch(setUser(null));
                    dispatch(setIsAuthenticated(false));
                }
            } else {
                console.log('No token found, clearing user data');
                dispatch(setUser(null));
                dispatch(setIsAuthenticated(false));
            }
        } catch (error) {
            console.error('Error fetching user:', error.response?.data || error.message);
            localStorage.removeItem('token');
            dispatch(setUser(null));
            dispatch(setIsAuthenticated(false));
            navigate('/auth/login');
        }
    };

    useEffect(() => {
        console.log('useFetchUser effect running');
        fetchUser();
    }, []); // Only run on mount

    return { fetchUser };
}; 