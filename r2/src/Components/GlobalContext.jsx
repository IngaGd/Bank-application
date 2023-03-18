import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useCreateData } from "../Use/useCreateData";
import { useDeleteData } from "../Use/useDeleteData";
import { useEditData } from "../Use/useEditData";
import { useListData } from "../Use/useListData";
import { useMessages } from "../Use/useMessages";
import { useModal } from "../Use/useModal";
import axios from "axios";
import { useUserData } from "../Use/useUserData";


export const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {

    const [messages, addMessage] = useMessages([]);
    const [deleteRes, setDeleteData] = useDeleteData(null)
    const [list, setLastUpdate] = useListData(null);
    const [deleteModal, setDeleteModal, editModal, setEditModal] = useModal();
    const [createRes, setCreateData] = useCreateData(null);
    const [editRes, setEditData] = useEditData(null);

    const [users, setUpdateUsers] = useUserData();

    const [route, setRoute] = useState('bank');
    const [logged, setLogged] = useState(null);
    const [authName, setAuthName] = useState(null);

    useEffect(() => {

        if (route === 'users') {
            setUpdateUsers(Date.now());
        } else if (route === 'bank') {
            setLastUpdate(Date.now());
        }

    }, [route])


    const logOut = _ => {
        axios.post('http://localhost:3003/logout', {}, { withCredentials: true })
        .then(res => {
            console.log(res.data);
            setLogged(false);
            setAuthName(false);
            setRoute('bank');
        });
    }


    useEffect(() => {
        if (deleteRes === null) {
            return;
        }
        addMessage({text: deleteRes.message.text});
        setLastUpdate(Date.now());
    }, [deleteRes, addMessage, setLastUpdate])

    useEffect(() => {
        if (createRes === null) {
            return;
        }
        addMessage({text: createRes.message.text});  
        setLastUpdate(Date.now());
    }, [createRes, addMessage, setLastUpdate]);

    useEffect(() => {
        if(editRes === null){
            return;
        }
        addMessage({text: editRes.message.text});
        setLastUpdate(Date.now());
    }, [editRes, addMessage, setLastUpdate])

    return (
        <GlobalContext.Provider value={{
            messages,
            setDeleteData,
            list, 
            deleteModal,
            setDeleteModal,
            editModal,
            setEditModal,
            setCreateData,
            setEditData,
            //route
            route, setRoute,
            //authorisation
            authName, setAuthName, logOut, logged, setLogged,
            //users
            users, setUpdateUsers,
            
        }}>
            {children}
        </GlobalContext.Provider>
    )
}