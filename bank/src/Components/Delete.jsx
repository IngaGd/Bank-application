import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

function Delete({setDeleteModal, account}) {

    const {setDeleteData} = useContext(GlobalContext);

    return (
        <div className="delete-modal">
            <span className="delete" onClick={() => setDeleteData(account)}>Confirm delete</span>
            <span className="delete" onClick={() => setDeleteModal(null)}>Cancel</span>            
        </div>
    )

}

export default Delete;