import axios from "axios";
import { BACKEND_URL } from "../utils/constant";


export const createJob = async ({ data }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BACKEND_URL}/job`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            }
        });
        return response;
    }
    catch (error) {
        return new Error(error.response.data.message);
    }
}