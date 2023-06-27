import { useState } from "react";
import axios from 'axios';
// import authService from "../../auth/authService";

export default function useProducts() {
    const [data, setData] = useState([]);
    const [err, setErr] = useState('');

    const getAllProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/products/list");
            console.log(res)
            setData(res.data)
        }
        catch (error) {
            setErr(error.response.data.error)
        }
    }

    return {
        err,
        data,
        getAllProducts
    }
}

