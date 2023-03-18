import { useContext, useState } from "react";
import { useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import Login from "./Login";
import { GlobalContext } from "./GlobalContext";

function Authentication({children}) {

    const [logged, setLogged] = useState(null);
    const {setAuthName} = useContext(GlobalContext);


       
    useEffect(() => {
        axios.get('http://localhost:3003/login', { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                if (res.data.status === 'valid') {
                    setLogged(true);
                    setAuthName(res.data.getName);
                } else {
                    setLogged(false);
                    setAuthName(null);
                }
            });
    }, [setLogged,setAuthName]);


    if (logged === null) { //jei laukimas, rodom loader
        return <Loader />
    }

    if (true === logged) {
        return (
            <>
            {children}
            </>
        )
    }

    if (false === logged) {
        return (
            <Login/>
        )
    }

}

export default Authentication;