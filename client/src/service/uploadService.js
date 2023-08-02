import axios from 'axios';
import baseUrl from './apiConfig';

export const uploadImg = (formData) => {
  return axios.post(`${baseUrl}/uploads`, formData);
};

export const deleteImg = (filename)=>{
  return axios.delete(`${baseUrl}/${filename}`);
}