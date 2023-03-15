import { useContext, useState } from 'react';
import { GlobalContext } from './GlobalContext';

function Edit({ setEditModal, editModal }) {

    const {setEditData} = useContext(GlobalContext);

    const [name, setName] = useState(editModal.name);
    const [surname, setSurname] = useState(editModal.surname);
    const [balance, setBalance] = useState(editModal.balance);
    const [amount, setAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddFunds = () => {
        setBalance(balance + amount);
        setAmount(0);
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
    });
    setEditModal(null);
  };

  return (
    <>
      <div className="edit-modal">
        <div className="buttons">
          {/* <button onClick={() => setAmount(0)}>Clear</button> */}
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