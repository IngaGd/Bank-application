import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useModal } from '../Use/useModal';
import { useReadAccounts } from '../Use/useReadAccounts';
//import { useReadUsers } from '../Use/useReadUsers';
import { useWriteAccount } from '../Use/useWriteAccount';
import axios from 'axios';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    // const [users, updateUsers] = useReadUsers();
    const [accounts, updateAccounts] = useReadAccounts();
    const [response, setCreateAccount, setEditAccount, setDeleteAccount] = useWriteAccount();
    const [editModalAccount, setEditModalAccount] = useModal();
    const [logged, setLogged] = useState();
    const [authName, setAuthName] = useState();    

    // useEffect(() => {
    //     updateUsers(Date.now())
    // }, [updateUsers]);

    useEffect(() => {
        updateAccounts(Date.now())
    }, [updateAccounts, response]);

    const logOut = _ => {
        axios.post('http://localhost:3006/logout', {}, { withCredentials: true })
        .then(res => {
            console.log(res.data);
            setLogged(false);
            setAuthName(false);
            setLogged(2);//kai atsijungiam, loginas = 2
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                //list of users
                // users, updateUsers,
                //list of accounts
                accounts, updateAccounts,
                //create accounts
                setCreateAccount, setDeleteAccount, setEditAccount,
                editModalAccount, setEditModalAccount,
                logged, setLogged, authName, setAuthName,
                logOut

            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
