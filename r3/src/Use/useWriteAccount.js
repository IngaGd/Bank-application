import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

const URL = 'http://localhost:3006/accounts';

export const useWriteAccount = _ => {

    const [response, setResponse] = useState(null);
    const [create, setCreateData] = useState(null);
    const [destroy, setDelete] = useState(null);
    const [edit, setEdit] = useState(null);

    useEffect(() => {
        if (create === null) {
            return;
        }
        axios.post(URL, create, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setResponse(res.data);
            })
    }, [create]);

    useEffect(() => {
        if (null === edit) {
            return;
        }
        axios.put(URL + '/' + edit.id, edit, { withCredentials: true })
            .then(res => {
                setResponse(res.data)
            });

    }, [edit]);

    useEffect(() => {
        if (destroy === null) {
            return;
        }
        axios.delete(URL + '/' + destroy.id, { withCredentials: true })
            .then(res => setResponse(res.data));
    }, [destroy]);


    return [response, setCreateData, setEdit, setDelete];
}