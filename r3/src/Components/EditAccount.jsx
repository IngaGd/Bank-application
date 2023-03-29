import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './GlobalContext';

function EditAccount() {

    const {setEditAccount, editModalAccount, setEditModalAccount} = useContext(GlobalContext);

    const [amount, setAmount] = useState({
        name: '',
        surname: '',
        balance: 0
    });

    useEffect(() => {
        if (editModalAccount === null) {
            return;
        }
        setAmount({
            name: editModalAccount.name,
            surname: editModalAccount.surname,
            balance: editModalAccount.balance
        })
    }, [editModalAccount]);

    const handleClick = e => {
        setAmount(i => ({ ...i, [e.nativeEvent.target.getAttribute('name')]: e.target.value }));
    }

    const add = _ => {
        setEditAccount({
            id: editModalAccount.id,
            name: amount.name,
            surname: amount.surname,
            balance: editModalAccount.balance + parseInt(amount.balance),
        });
        setEditModalAccount(null);
    }

    const withdraw  = _ => {
        setEditAccount({
            id: editModalAccount.id,
            name: amount.name,
            surname: amount.surname,
            balance: editModalAccount.balance - parseInt(amount.balance),
        });
        setEditModalAccount(null);
    }



  return (
        <>
            <div className="title">
                Create account
            </div>
            <div className="account">
                {/* <label className="label">Set name</label>
                <input className="input" type="text" value={amount.name} name="name" onChange={handleClick} />

                <label className="label">Set surname</label>
                <input className="input" type="text" value={amount.surname} name="surname" onChange={handleClick} /> */}

                <label className="label">Set balance</label>
                <input className="input" type="text" value={amount.balance} name="balance" onChange={handleClick} />

                <button className="btn" onClick={add}>Add</button>
                <button className="btn" onClick={withdraw}>Withdraw</button>                
            </div>
        </>
  );
}
export default EditAccount;
