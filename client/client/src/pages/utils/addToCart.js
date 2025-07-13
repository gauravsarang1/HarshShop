import { api } from '../../api/api';
import { useSelector } from 'react-redux';

const addToCart = async (productId) => {
    const { user } = useSelector((state) => state.user);
    try {
        if(!user.authenticated) return;
        const response = await api.post('/carts/add-to-cart', {
            productId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log('response', response);
        return response.data.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

export default addToCart;