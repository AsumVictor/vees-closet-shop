import axios from 'axios';
import server from '../../server';

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'LoadUserRequest',
        });
        const { data } = await axios.get(`${server}user/getuser`);
        if (data) {
            dispatch({
                type: 'LoadUserSuccess',
                payload: data.user,
            });
        }
    } catch (error) {
        dispatch({
            type: 'LoadUserFail',
            payload: error,
        });
    }
};

// load seller
export const loadShop = () => async (dispatch) => {
    try {
        dispatch({
            type: 'LoadSellerRequest',
        });
        const { data } = await axios.get(`${server}/shop/getShop`);
        if (data) {
            dispatch({
                type: 'LoadSellerSuccess',
                payload: data.seller,
            });
        }
    } catch (error) {
        let errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: 'LoadSellerFail',
            payload: errorMessage,
        });
    }
};
