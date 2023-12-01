import axios from 'axios';
import { useState, useEffect } from 'react';

const URL = process.env.REACT_APP_URL + 'bank';

export const useDeleteData = init => {

    const [response, setResponse] = useState(null);
    const [data, setDeleteData] = useState(init);

    useEffect(() => {
        if (data === null) {
            return;
        }
        axios.delete(URL + '/' + data.id) //naudojam metoda delete
            //plius data.id, perdavimas per parametrus 
            .then(res => {
                console.log(res.data);
                setResponse(res.data);
            })

    }, [data])

    return [response, setDeleteData];

}