import axios from 'axios';
import baseUrl from './apiConfig';

export const postEmail = ({
        name,
        phone,
        email,
        company,
        country,
        products
    }) => {
    return axios.post(`${baseUrl}/email`, {
        name,
        phone,
        email,
        company,
        country,
        products
    });
};
export const requestCatalog = ({
        email,
        product
    }) => {
    return axios.post(`${baseUrl}/email/catalog`, {
        email,
        product
    });
};