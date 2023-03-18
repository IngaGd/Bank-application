import { useEffect, useState } from "react";
import axios from 'axios';

const URL = 'http://localhost:3003/bank';

export const useListData = init => {

    const [list, setList] = useState(init);
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    useEffect(() => {
        if (null === lastUpdate) {
            return;
        }
        axios.get(URL) //gaunam duomenis
            .then(res => {//kai gaunam duomenis, irasom i lista
                setList(res.data)
            });
    }, [lastUpdate]) //nuskaitom last update ir setinam i create ir delete

    return [list, setLastUpdate];

}