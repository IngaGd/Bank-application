import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"

const URL = process.env.REACT_APP_URL + 'bank';

export const useEditData = init => {

    const [response, setResponse] = useState(null);
    const [data, setEditData] = useState(init);


    useEffect(() => {
        if (data === null) {
            return;
        }
        axios.put(URL + '/' + data.id, data)
            .then(res => {
                console.log(res.data);
                setResponse(res.data);
            })
    }, [data])

    return [response, setEditData];
}