import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../api/api';
import { setUser, setIsAuthenticated } from '../features/userSlice';

export const useFetchUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // 🔁 Listen to path changes

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);

      if (!token) return;

      const response = await api.get('/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.data) {
        dispatch(setUser(response.data.data));
        dispatch(setIsAuthenticated(true));
      } else {
        console.error('No user data in response');
        dispatch(setUser(null));
        dispatch(setIsAuthenticated(false));
      }
    } catch (error) {
      console.error('Error fetching user:', error.response?.data || error.message);
      // Optional: logout on error
      // localStorage.removeItem('token');
      // dispatch(setUser(null));
      // dispatch(setIsAuthenticated(false));
      // navigate('/auth/login');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location.pathname]); // 🔁 Run on path change

  return { fetchUser };
};
