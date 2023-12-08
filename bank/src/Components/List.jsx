import axios from 'axios';
import { useContext, useState } from 'react';
import Delete from './Delete';
import Edit from './Edit';
import { GlobalContext } from './GlobalContext';
// import Messages from './Messages';

const URL = process.env.REACT_APP_URL || 'http://localhost:3003/';
const IMG = process.env.REACT_APP_IMG_URL;

function List({ setEditData, filter, sort, errorMessage, setErrorMessage }) {
    const {
        setDeleteModal,
        deleteModal,
        setDeleteData,
        setEditModal,
        editModal,
        list,
        setLastUpdate,
        reduceBalances,
    } = useContext(GlobalContext);

    const [blockedAccountError, setBlockedAccountError] = useState('');
    const [activeButtons, setActiveButtons] = useState({});

    if (null === list) {
        //jei useState(null), vadinasi dar negavom is serverio jokiu duomenu
        return (
            <div className="list">
                <div className="loader">LOADING...</div>
            </div>
        );
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
            setDeleteModal({
                message: 'Only accounts with 0 balance can be deleted',
            });
            setTimeout(() => {
                setDeleteModal(null);
            }, 2000);
        } else {
            setDeleteModal(account);
        }
    };

    const handleBlockAccount = async (accountId) => {
        try {
            await axios.put(
                `${URL}bank/block/${accountId}`,
                {},
                { withCredentials: true }
            );
            setLastUpdate(Date.now()); // Trigger a refresh of the account list
            setActiveButtons({ ...activeButtons, [accountId]: 'block' });
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnblockAccount = async (accountId) => {
        try {
            await axios.put(
                `${URL}bank/unblock/${accountId}`,
                {},
                { withCredentials: true }
            );
            setLastUpdate(Date.now()); // Trigger a refresh of the account list
            setActiveButtons({ ...activeButtons, [accountId]: 'unblock' });
        } catch (error) {
            console.error(error);
        }
    };

    const handleActionIfNotBlocked = (account, action) => {
        if (account.blocked) {
            setBlockedAccountError(
                'Account is blocked. Please unblock it first.'
            );
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
        <div className="list">
            <div className="list__title">List of accounts</div>
            <div className="list__taxes-container">
                <button className="btn btn--tax" onClick={reduceBalances}>
                    TAXES: Reduce All Balances by 5
                </button>
            </div>
            <div className="list__clients">
                {filteredList.map((a) => (
                    <div key={a.id} className="client">
                        <div className="client__image-box">
                            {a.image ? (
                                <img
                                    className="client__image"
                                    alt="client"
                                    src={IMG + a.image}
                                />
                            ) : (
                                <img
                                    className="client__image"
                                    alt="default"
                                    src={IMG + 'default-profile-photo.png'}
                                />
                            )}
                        </div>
                        <div className="client__data">
                            <span className="client__label-text">Name:</span>{' '}
                            <span className="client__input-text">{a.name}</span>
                        </div>
                        <div className="client__data">
                            <span className="client__label-text">Surname:</span>{' '}
                            <span className="client__input-text">
                                {a.surname}
                            </span>
                        </div>
                        <div className="client__data">
                            <span className="client__label-text">Balance:</span>{' '}
                            <span className="client__input-text">
                                {a.balance}
                            </span>
                        </div>
                        <div className="btn btn-list">
                            <button
                                className={`btn block${
                                    activeButtons[a.id] === 'block'
                                        ? ' btn-list__block--active'
                                        : ''
                                }`}
                                onClick={() => handleBlockAccount(a.id)}
                                disabled={a.blocked}
                            >
                                Blocked
                            </button>
                            <button
                                className={`btn unblock${
                                    activeButtons[a.id] === 'unblock'
                                        ? ' btn-list__unblock--active'
                                        : ''
                                }`}
                                onClick={() => handleUnblockAccount(a.id)}
                                disabled={!a.blocked}
                            >
                                Unblocked
                            </button>
                            <div
                                className="btn delete"
                                onClick={() =>
                                    handleActionIfNotBlocked(a, () =>
                                        handleDelete(a)
                                    )
                                }
                            >
                                Delete
                            </div>
                            <div
                                className="btn edit"
                                onClick={() =>
                                    handleActionIfNotBlocked(a, () =>
                                        setEditModal(a)
                                    )
                                }
                            >
                                Edit
                            </div>
                        </div>

                        {deleteModal && deleteModal.id === a.id ? (
                            <Delete
                                account={a}
                                setDeleteModal={setDeleteModal}
                                setDeleteData={setDeleteData}
                            />
                        ) : null}
                        {editModal && editModal.id === a.id ? (
                            <Edit
                                setEditModal={setEditModal}
                                editModal={editModal}
                                setEditData={setEditData}
                                errorMessage={errorMessage}
                                setErrorMessage={setErrorMessage}
                            />
                        ) : null}
                    </div>
                ))}
                <div className="negative-msg">
                    {deleteModal && deleteModal.message && (
                        <div className="error">{deleteModal.message}</div>
                    )}
                    {blockedAccountError && (
                        <div className="error">{blockedAccountError}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default List;
