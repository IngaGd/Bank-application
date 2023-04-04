import axios from "axios";
import { useContext, useState } from "react";
import Delete from "./Delete";
import Edit from "./Edit";
import { GlobalContext } from "./GlobalContext";
import Messages from "./Messages";

const IMG = 'http://localhost:3003/img/';


function List({  setEditData, filter, sort, errorMessage, setErrorMessage}) {

    const {setDeleteModal, deleteModal, setDeleteData, setEditModal, editModal, list, setLastUpdate} = useContext(GlobalContext);
    
    const [blockedAccountError, setBlockedAccountError] = useState('');
    const [activeButtons, setActiveButtons] = useState({});

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
    } else if (filter === 'blocked') {
        filteredList = list.filter((account) => account.blocked === 1);
    } else if (filter === 'unblocked') {
        filteredList = list.filter((account) => account.blocked === 0);
    } else if (filter === 'negative') {
        filteredList = list.filter((account) => account.balance < 0);
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

const handleBlockAccount = async (accountId) => {
    try {
        await axios.put(`http://localhost:3003/bank/block/${accountId}`, {}, { withCredentials: true });
        setLastUpdate(Date.now()); // Trigger a refresh of the account list
        setActiveButtons({ ...activeButtons, [accountId]: 'block' });
    } catch (error) {
        console.error(error);
    }
};

const handleUnblockAccount = async (accountId) => {
    try {
        await axios.put(`http://localhost:3003/bank/unblock/${accountId}`, {}, { withCredentials: true });
        setLastUpdate(Date.now()); // Trigger a refresh of the account list
        setActiveButtons({ ...activeButtons, [accountId]: 'unblock' });
    } catch (error) {
        console.error(error);
    }
};

    const handleActionIfNotBlocked = (account, action) => {
        if (account.blocked) {
            setBlockedAccountError('Account is blocked. Please unblock it first.');
            setTimeout(() => {
                setBlockedAccountError('');
            }, 2000);
        } else {
            action();
        }
    };

    if (sort === 'name') {
        filteredList.sort((a, b) => a.surname.localeCompare(b.surname));
    } else if (sort === 'balance') {
        filteredList.sort((a, b) => a.balance - b.balance);
    }


    return (
        <>
            <div className="title">
                List of accounts
            </div>
            <div className="client-list">
                {
                    filteredList.map(a => <div key={a.id} className="client">
                        <div>
                            {
                                a.image ? <img className='profile' src={IMG + a.image} /> : <img className='profile' src={IMG + 'portal.png'} />
                            }
                        </div>
                        <div className="client-data"><span className="label-text">Name:</span> <span className="input-text">{a.name}</span></div>
                        <div className="client-data"><span className="label-text">Surname:</span> <span className="input-text">{a.surname}</span></div>
                        <div className="client-data"><span className="label-text">Balance:</span> <span className="input-text">{a.balance}</span></div>
                        <div className="list-buttons">

                            <button className={`block-btn${activeButtons[a.id] === 'block' ? " active" : ""}`} onClick={() => handleBlockAccount(a.id)} disabled={a.blocked}>Blocked</button>
                            <button className={`unblock-btn${activeButtons[a.id] === 'unblock' ? " active" : ""}`} onClick={() => handleUnblockAccount(a.id)} disabled={!a.blocked}>Unblocked</button>

                            <div className="delete-button" onClick={() => handleActionIfNotBlocked(a, () => handleDelete(a))}></div>
                            <div className="edit-button" onClick={() => handleActionIfNotBlocked(a, () => setEditModal(a))}></div>

                        </div>


                        {
                            deleteModal && deleteModal.id === a.id ? <Delete account={a} setDeleteModal={setDeleteModal} setDeleteData={setDeleteData} /> : null
                        }                        
                        {
                            editModal && editModal.id === a.id ? <Edit setEditModal={setEditModal} editModal={editModal} setEditData={setEditData} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> : null
                        }                     
                        
                    </div>)
                }
            </div>
            <div className="negative-msg">
                {deleteModal && deleteModal.message && <div className="error">{deleteModal.message}</div>}
                {blockedAccountError && <div className="error">{blockedAccountError}</div>}
            </div>
  
        </>
    );
}

export default List;