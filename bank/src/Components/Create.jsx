import { useContext } from "react";
import { useState } from "react";
import { useFile } from "../Use/useFile";
import { GlobalContext } from "./GlobalContext";


function Create() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');  
    const [balance, setBalance] = useState(0);  
    const [file, readFile, remFile] = useFile();//nuskaitytas failas

    const {setCreateData} = useContext(GlobalContext);    

    const create = _ => {
        setCreateData(
            {
                name: name, 
                surname: surname, 
                balance: parseInt(balance),
                file
            }); 
            setName('');
            setSurname('');
            setBalance(0);
            remFile();
    }

return (
        <>
            <div className="title">
                Create account
            </div>
            <div className="account">
                <div>
                    {
                        file
                        ? <img className="img" src={file} alt="upload" />
                        : null
                    }
                </div>

                <label className="label">Choose image</label>
                <input className="input" type="file" onChange={readFile} />


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

