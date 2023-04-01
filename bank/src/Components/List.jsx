import { useContext } from "react";
import Delete from "./Delete";
import Edit from "./Edit";
import { GlobalContext } from "./GlobalContext";
import Messages from "./Messages";
const IMG = 'http://localhost:3003/img/';

function List({  setEditData, filter, errorMessage, setErrorMessage}) {

    const {setDeleteModal, deleteModal, setDeleteData, setEditModal, editModal, list} = useContext(GlobalContext);


    if (null === list) { //jei useState(null), vadinasi dar negavom is serverio jokiu duomenu
        return (
            <div className="list">
                <div className="loader">
                    LOADING...
                </div>
            </div>            
        )
    }

    let filteredList = list;

    if (filter === 'valid') {
        filteredList = list.filter((account) => account.balance > 0);
    } else if (filter === 'empty') {
        filteredList = list.filter((account) => account.balance === 0);
    }

    const handleDelete = (account) => {
        if (account.balance > 0) {
            setDeleteModal({ message: "Only accounts with 0 balance can be deleted" });
            setTimeout(() => {
                setDeleteModal(null);
            }, 2000);
        } else {
            setDeleteModal(account);
        }
    };


    return (
        <>
            <div className="title">
                List of accounts
            </div>
            <div className="client-list">
                {
                    filteredList.map(d => <div key={d.id} className="client">
                        <div>
                            {
                                d.image ? <img className='profile' src={IMG + d.image} /> : <img className='profile' src={IMG + 'portal.png'} />
                            }
                        </div>
                        <div className="client-data"><span className="label-text">Name:</span> <span className="input-text">{d.name}</span></div>
                        <div className="client-data"><span className="label-text">Surname:</span> <span className="input-text">{d.surname}</span></div>
                        <div className="client-data"><span className="label-text">Balance:</span> <span className="input-text">{d.balance}</span></div>
                        <div className="delete-button" onClick={() => handleDelete(d)}></div>
                        <div className="edit-button" onClick={() => setEditModal(d)}></div>
                        {
                            deleteModal && deleteModal.id === d.id ? <Delete account={d} setDeleteModal={setDeleteModal} setDeleteData={setDeleteData} /> : null
                        }                        
                        {
                            editModal && editModal.id === d.id ? <Edit setEditModal={setEditModal} editModal={editModal} setEditData={setEditData} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> : null
                        }                     
                        
                    </div>)
                }
            </div>
            <div className="negative-msg">
                {deleteModal && deleteModal.message && <div className="error">{deleteModal.message}</div>}
            </div>
  
        </>
    );
}

export default List;