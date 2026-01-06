import axios from 'axios';
import baseUrl from './apiConfig';

export const createPopup = (data) => {
    return axios.post(`${baseUrl}/popup`, data);
};

export const updatePopup = (data) => {
    return axios.put(`${baseUrl}/popup`, data);
};

export const deletePopup = (_id) => {
    return axios.delete(`${baseUrl}/popup/${_id}`);
};

export const findAllPopups = () => {
    return axios.get(`${baseUrl}/popup`);
};

export const findOnePopup = (_id) => {
    return axios.post(`${baseUrl}/popup/find`, { _id });
};

export const findActivePopups = () => {
    return axios.get(`${baseUrl}/popup/active`);
};
