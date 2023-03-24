import { useEffect } from 'react';
import { createContext } from 'react';
import { useRead } from '../Use/useRead';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [users, updateUsers] = useRead();

    useEffect(() => {
        updateUsers(Date.now())
    }, [updateUsers]);

    return (
        <GlobalContext.Provider
            value={{
                users,
                updateUsers,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
