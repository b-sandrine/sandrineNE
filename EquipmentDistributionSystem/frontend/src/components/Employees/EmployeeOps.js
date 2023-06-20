import { useState } from "react";
import axios from 'axios';
import authService from "../../auth/authService";

export default function useEmployees() {
    const [data, setData] = useState([]);
    const [err, setErr] = useState('');

    const getAllEmployees = async (count) => {
        try {
            const res = await axios.get("http://localhost:5000/api/employees/list", {
                headers: {
                    token: `Bearer ${authService.getAuthToken()}`,
                    count: count
                }
            });
            console.log(res.data.employees)
            setData(res.data.employees)
        }
        catch (error) {
            setErr(error.response.data.error)
        }
    }

    return {
        err,
        data,
        getAllEmployees
    }
}

