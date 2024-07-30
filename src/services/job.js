import axios from "axios";
import { BACKEND_URL } from "../utils/constant";


export const createJob = async ({ data, id }) => {
    try {
        const URL = id ? `${BACKEND_URL}/job/${id}` : `${BACKEND_URL}/job`;
        const token = localStorage.getItem('token');
        const response = await axios.post(URL, data, {
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

export const getJobs = async ({ id }) => {
    try {
        const URL = id ? `${BACKEND_URL}/job/${id}` : `${BACKEND_URL}/job`;
        const response = await axios.get(URL);
        return response;
    }
    catch (error) {
        return new Error(error.response.data.message);
    }
}