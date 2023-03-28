import { useState, useEffect } from "react";
import axios from 'axios';

const URL = 'http://localhost:3006/users';

export const useReadUsers = _ => {

    const [list, setList] = useState(null);
    const [update, setUpdate] = useState();

    useEffect(() => {
        axios.get(URL, { withCredentials: true })
            .then(res => setList(res.data))
    }, [update]);


    return [list, setUpdate];
}