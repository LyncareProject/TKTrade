import axios from 'axios';
import baseUrl from './apiConfig';

export const createProduct = ({
        id,
        nameEng,
        name,
        category,
        category_2,
        content,
        contentEng,
        pdf,
        images
    }) => {
    return axios.post(`${baseUrl}/product`, {
        id,
        nameEng,
        name,
        category,
        category_2,
        content,
        contentEng,
        pdf,
        images
    });
};
export const findAllProduct = () => {
    return axios.get(`${baseUrl}/product`);
};