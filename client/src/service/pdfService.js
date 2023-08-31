import axios from 'axios';
import baseUrl from './apiConfig';

export const uploadPDF = ( pdfData ) => {
    return axios.post(`${baseUrl}/pdf`, pdfData);
};

export const deletePDF = (filename)=>{
    return axios.delete(`${baseUrl}/pdf/${filename}`);
}