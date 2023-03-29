import { useContext, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import Login from "./Login";
import { GlobalContext } from "./GlobalContext";



function Authorisation({children}) {


    const {setAuthName, logged, setLogged} = useContext(GlobalContext);


       
    useEffect(() => {
        axios.get('http://localhost:3006/login', { withCredentials: true })
            .then((res) => {
                if (res.data.status === 'valid') {
                        setAuthName(res.data.getName);
                        setLogged(1);
                    } else {
                        setAuthName(null);
                        setLogged(2);
                    }
            })
            .catch(_ => {
                setAuthName(null);
                setLogged(2);
            })
    }, [setAuthName, setLogged]);


    if (logged === null) { //jei laukimas, rodom loader
        return <Loader />
    }

    if (1 === logged) { //jei prisijunge, vardas
        return (
            <>
            {children}
            </>
        )
    }

    if (2 === logged) {//jei neprisijunges, loginas
        return (
            <Login/>
        )
    }

}

export default Authorisation;