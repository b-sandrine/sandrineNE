import { useState } from "react";
import axios from 'axios';
// import authService from "../../auth/authService";

export default function useCart() {
    const [data, setData] = useState([]);
    const [err, setErr] = useState('');

    const getAllCartProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/purchased/list");
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
        getAllCartProducts
    }
}

