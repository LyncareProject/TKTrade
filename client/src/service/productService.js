import axios from 'axios';
import baseUrl from './apiConfig';

export const createProduct = ({
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
export const updateProduct = ({
        _id,
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
    return axios.put(`${baseUrl}/product`, {
        _id,
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
export const deleteProduct = ({ _id }) => {
    return axios.delete(`${baseUrl}/product/${ _id }`);
};
export const findAllProduct = () => {
    return axios.get(`${baseUrl}/product`);
};
export const findOneProduct = ({ _id }) => {
    return axios.post(`${baseUrl}/product/find`, { _id });
};
