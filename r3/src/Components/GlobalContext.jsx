import { useEffect } from 'react';
import { createContext } from 'react';
import { useReadAccounts } from '../Use/useReadAccounts';
import { useReadUsers } from '../Use/useReadUsers';
import { useWriteAccount } from '../Use/useWriteAccount';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [users, updateUsers] = useReadUsers();
    const [accounts, updateAccounts] = useReadAccounts();
    const [createRes, setCreateAccount] = useWriteAccount(null);

    useEffect(() => {
        updateUsers(Date.now())
    }, [updateUsers]);

    useEffect(() => {
        updateAccounts(Date.now())
    }, [updateAccounts, createRes]);

    return (
        <GlobalContext.Provider
            value={{
                //list of users
                users, updateUsers,
                //list of accounts
                accounts, updateAccounts,
                //create accounts
                createRes, setCreateAccount
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
