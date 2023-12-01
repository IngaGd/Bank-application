
import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = process.env.REACT_APP_URL + 'users';

export const useDeleteUser = _ => {

    const [response, setResponse] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);


    useEffect(() => {
        if (null === deleteUser) {
            return;
        }
        axios.delete(URL + '/' + deleteUser.id, { withCredentials: true })
            .then(res => setResponse(res.data))
            .catch(error => setResponse(error))

    }, [deleteUser]);


    return [response, setDeleteUser];

}