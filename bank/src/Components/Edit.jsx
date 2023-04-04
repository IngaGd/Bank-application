import { useContext, useState } from 'react';
import { GlobalContext } from './GlobalContext';
import { useFile } from "../Use/useFile";

const IMG = 'http://localhost:3003/img/';

function Edit({ setEditModal, editModal }) {

    const {setEditData} = useContext(GlobalContext);

    const [name, setName] = useState(editModal.name);
    const [surname, setSurname] = useState(editModal.surname);
    const [balance, setBalance] = useState(editModal.balance);
    const [amount, setAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmLargeAmount, setConfirmLargeAmount] = useState(false);

    const [file, readFile, remFile] = useFile();

    const handleAddFunds = () => {
        if (amount > 1000) {
            setConfirmLargeAmount(true);
        } else {
            setBalance(balance + amount);
            setAmount(0);
        }
    };

    const handleConfirmLargeAmount = () => {
        setBalance(balance + amount);
        setAmount(0);
        setConfirmLargeAmount(false);
    };

    const handleWithdrawFunds = () => {
        if (balance - amount < 0) {
            setErrorMessage('There is not enough money in account.');
            setTimeout(() => {
                setErrorMessage(null);
            }, 2000);
        } else {
            setBalance(balance - amount);
            setAmount(0);
            setErrorMessage('');
        }
    };

    const saveChanges = () => {
        setEditData({
            name,
            surname,
            balance,
            id: editModal.id,
            file
        });
        setEditModal(null);
    };

    return (
        <>
            <div className="edit-modal">
                <div className="buttons">
                    <button className='edit-btn' onClick={handleAddFunds}>Add amount</button>
                    <button className='edit-btn' onClick={handleWithdrawFunds}>Withdraw</button>
                </div>
                <div className='input-container'>
                    <div className="input-group">
                        <label className='label-amount'>Amount to change:</label>
                        <input className='input-white' type="text" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className='label-balance'>Current balance:</label>
                        <input className='input-grey' type="text" value={balance} onChange={(e) => setBalance(parseInt(e.target.value))} />
                    </div>
                </div>
                {
                    confirmLargeAmount &&
                    <div className='confirmation'>
                        <p>Are you sure you want to add ${amount} to the account?</p>
                        <button onClick={handleConfirmLargeAmount}>Yes</button>
                        <button onClick={() => setConfirmLargeAmount(false)}>No</button>
                    </div>
                }
                <div className="input-group">
                    <label className="label">Choose image</label>
                    <input className="input-file" type="file" onChange={readFile} />
                </div>
                <div className='edit-img'>
                {
                    file
                    ? <img className='img' src={file} alt="upload" />
                    : (
                        editModal.image
                        ? <img className='img' src={IMG + editModal.image} alt="upload" />
                        : <img className='img' src={IMG + 'portal.png'} alt="upload" />
                    )
                }

                </div>


                <button className="bottom-btn" onClick={saveChanges}>
                    Save changes
                </button>
                <button className="bottom-btn" onClick={() => setEditModal(null)}>
                    Cancel
                </button>

                <div className='msg'>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>

            </div>
        </>
    );
}

export default Edit;
