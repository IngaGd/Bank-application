import { useEffect } from 'react';
import { createContext } from 'react';
import { useReadAccounts } from '../Use/useReadAccounts';
import { useReadUsers } from '../Use/useReadUsers';
import { useWriteAccount } from '../Use/useWriteAccount';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [users, updateUsers] = useReadUsers();
    const [accounts, updateAccounts] = useReadAccounts();
    const [response, setCreateAccount, setEditAccount, setDeleteAccount] = useWriteAccount();

    useEffect(() => {
        updateUsers(Date.now())
    }, [updateUsers]);

    useEffect(() => {
        updateAccounts(Date.now())
    }, [updateAccounts, response]);

    return (
        <GlobalContext.Provider
            value={{
                //list of users
                users, updateUsers,
                //list of accounts
                accounts, updateAccounts,
                //create accounts
                setCreateAccount, setDeleteAccount
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};