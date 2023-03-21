import { useContext, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import Login from "./Login";
import { GlobalContext } from "./GlobalContext";
import RoleError from "./RoleError";


function Authorisation({children, roles}) {


    const {setAuthRole, setAuthName, logged, setLogged, route, setLastUpdate, setUpdateUsers} = useContext(GlobalContext);


       
    useEffect(() => {
        axios.get('http://localhost:3003/login', { withCredentials: true })
            .then((res) => {
                console.log(roles);

                if (res.data.status === 'valid') {
                    setAuthName(res.data.getName);
                    setAuthRole(res.data.role);
                    if (roles) {
                        if (roles.split(',').includes(res.data.role)) {
                            setLogged(1);
                            if (route === 'bank') {
                                setLastUpdate(Date.now());
                            } else if (route === 'users') {
                                setUpdateUsers(Date.now());
                            }
                        } else {
                            setLogged(3);
                        }
                    } else {
                        setLogged(1);
                    }

                } else {
                    setAuthName(null);
                    setAuthRole(null);
                    if (roles) {
                        setLogged(2);
                    } else {
                        setLogged(1);
                    }
                }

                // if (roles.length) {

                // }
                // if (res.data.status === 'valid') {
                //     setLogged(true);
                //     setAuthName(res.data.getName);
                // } else {
                //     setLogged(false);
                //     setAuthName(null);
                // }
            });
    }, [roles, route, setAuthName, setLastUpdate, setLogged, setUpdateUsers, setAuthRole]);


    if (logged === null) { //jei laukimas, rodom loader
        return <Loader />
    }

    if (1 === logged) {
        return (
            <>
            {children}
            </>
        )
    }

    if (2 === logged) {
        return (
            <Login/>
        )
    }
    if (3 === logged) {
        return (
            <RoleError/>
        )
    }

}

export default Authorisation;