import { useState } from "react";


function Create({setCreateData}) {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');  
    const [balance, setBalance] = useState(0);  
    

    const create = _ => {
        setCreateData(
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

                {/* <label className="label">Balance</label>
                <input className="input" type="text" value={balance} onChange={e => setBalance(e.target.value)}/> */}
                <button className="btn" onClick={create}>Create account</button>
            </div>
        </>
    )
}

export default Create;

