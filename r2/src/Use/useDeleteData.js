import axios from 'axios';
import { useState, useEffect } from 'react';

const URL = 'http://localhost:3003/bank';

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