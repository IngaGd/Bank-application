import { useContext } from "react";
import { useState } from "react";
import { GlobalContext } from "./GlobalContext";


function CreateAccount() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');  
    const [balance, setBalance] = useState(0);  
    const {setCreateAccount} = useContext(GlobalContext);
    

   const createAccount = _ => {
        setCreateAccount(
            {
                name: name, 
                surname: surname, 
                balance: parseInt(balance)
            }); 
            setName('');
            setSurname('');
            setBalance(0);
    }



return (
        <>
            <div className="title">
                Create account
            </div>
            <div className="account">
                <label className="label">Set name</label>
                <input className="input" type="text" value={name} onChange={e => setName(e.target.value)} />

                <label className="label">Set surname</label>
                <input className="input" type="text" value={surname} onChange={e => setSurname(e.target.value)} />

                <button className="btn" onClick={createAccount}>Create account</button>
            </div>
        </>
    )
}

export default CreateAccount;
