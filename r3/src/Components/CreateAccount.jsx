import { useContext } from "react";
import { useState } from "react";
import { useFile } from "../Use/useFile";
import { GlobalContext } from "./GlobalContext";


function CreateAccount() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');  
    const [balance, setBalance] = useState(0);  
    const {setCreateAccount} = useContext(GlobalContext);
    const [file, readFile] = useFile();//nuskaitytas failas
    

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
                <div>
                    {
                        file ?
                        <img className="image" src={file} alt="upload image" />
                        : null
                    }
                </div>
                <label className="label">Set name</label>
                <input className="input" type="text" value={name} onChange={e => setName(e.target.value)} />

                <label className="label">Set surname</label>
                <input className="input" type="text" value={surname} onChange={e => setSurname(e.target.value)} />

                <button className="btn" onClick={createAccount}>Create account</button>

                <label className="label" htmlFor="formFile">Upload document</label>
                <input className="input" type="file" onChange={readFile} />
            </div>
        </>
    )
}

export default CreateAccount;
