import axios from 'axios';
import server from '../../../server';

// create product
export const createProduct = (product) => async (dispatch) => {
    try {
        dispatch({
            type: 'productCreateRequest',
        });

        const { data } = await axios.post(`${server}/product/create-product`, product);
        dispatch({
            type: 'productCreateSuccess',
            payload: data.product,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: 'productCreateFail',
            payload: error.response.data.message,
        });
    }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'deleteProductRequest',
        });

        const { data } = await axios.delete(`${server}/product/delete-shop-product/${id}`);
        if (data.success) {
            dispatch({
                type: 'deleteProductSuccess',
                payload: data.message,
            });
        } else {
            dispatch({
                type: 'deleteProductFailed',
                payload: 'Opps! Error occured deleting',
            });
        }
    } catch (error) {
        let errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: 'deleteProductFailed',
            payload: errorMessage,
        });
    }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: 'getAllProductsRequest',
        });

        const { data } = await axios.get(`${server}/product/get-all-products`);
        dispatch({
            type: 'getAllProductsSuccess',
            payload: data.products,
        });
    } catch (error) {
        let errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: 'getAllProductsFailed',
            payload: errorMessage,
        });
    }
};
