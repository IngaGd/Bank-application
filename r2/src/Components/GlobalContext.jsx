import { useEffect } from "react";
import { createContext } from "react";
import { useCreateData } from "../Use/useCreateData";
import { useDeleteData } from "../Use/useDeleteData";
import { useEditData } from "../Use/useEditData";
import { useListData } from "../Use/useListData";
import { useMessages } from "../Use/useMessages";
import { useModal } from "../Use/useModal";


export const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {

    const [messages, addMessage] = useMessages([]);
    const [deleteRes, setDeleteData] = useDeleteData(null)
    const [list, setLastUpdate] = useListData(null);
    const [deleteModal, setDeleteModal, editModal, setEditModal] = useModal();
    const [createRes, setCreateData] = useCreateData(null);
    const [editRes, setEditData] = useEditData(null);


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
            setEditData
        }}>
            {children}
        </GlobalContext.Provider>
    )
}