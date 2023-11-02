import axios from 'axios';
import baseUrl from './apiConfig';

// Main Category API Functions
export const createCategory = ({ category, images }) => {
    return axios.post(`${baseUrl}/category`, {category, images });
};

export const readCategory = () => {
    return axios.get(`${baseUrl}/category`);
};

export const deleteCategory = ({ category }) => {
    return axios.delete(`${baseUrl}/category/${category}`);
};

export const updateCategory = ({ category, changedCategory, images }) => {
    return axios.put(`${baseUrl}/category`, {category, changedCategory, images });
};
