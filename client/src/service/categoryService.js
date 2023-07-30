import axios from 'axios';
import baseUrl from './apiConfig';

export const createCategory = ({
        category
    }) => {
    return axios.post(`${baseUrl}/category`, {
        category
    });
};
export const readCategory = () => {
    return axios.get(`${baseUrl}/category`);
};
export const deleteCategory = ({ category }) => {
    return axios.delete(`${baseUrl}/category/${category}`);
};


export const createSubcategory = ({
        category,
        subcategory
    }) => {
    return axios.post(`${baseUrl}/category/subcategory/create`, {
        category,
        subcategory
    });
};
export const readSubcategory = ({ category }) => {
    return axios.post(`${baseUrl}/category/subcategory`, { category });
};
export const readAllSubcategory = () => {
    return axios.get(`${baseUrl}/category/subcategory`);
};
export const deleteSubcategory = ({ category, subcategory }) => {
    return axios.post(`${baseUrl}/category/subcategory/delete`, {
        category, subcategory
    });
};