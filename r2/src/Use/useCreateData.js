import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

const URL = 'http://localhost:3003/bank';

export const useCreateData = init => {

    const [response, setResponse] = useState(null);
    const [data, setCreateData] = useState(init);

    useEffect(() => {
        if (data === null) {
            return;
        }
        axios.post(URL, data)
            .then(res => {
                console.log(res.data);
                setResponse(res.data);
            })
    }, [data]);


    return [response, setCreateData];
}