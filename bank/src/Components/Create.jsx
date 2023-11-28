import { useContext } from 'react';
import { useState } from 'react';
import { useFile } from '../Use/useFile';
import { GlobalContext } from './GlobalContext';

function Create() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [balance, setBalance] = useState(0);
    const [file, readFile, remFile] = useFile(); //nuskaitytas failas

    const { setCreateData } = useContext(GlobalContext);

    const create = (_) => {
        setCreateData({
            name: name,
            surname: surname,
            balance: parseInt(balance),
            file,
        });
        setName('');
        setSurname('');
        setBalance(0);
        remFile();
    };

    return (
        <>
            <div className="title">Create account</div>
            <div className="account">
                <div className="file-upload-box">
                    <div>
                        <div className="file-uplodad">
                            {file ? (
                                <img className="img" src={file} alt="upload" />
                            ) : null}
                        </div>
                    </div>

                    <div className="create-input">
                        <label className="label">Choose image (.png) </label>
                        <input
                            className="input"
                            type="file"
                            onChange={readFile}
                        />
                    </div>
                </div>
                <div className="inputs-and-btn">
                    <div className="create-input-box">
                        <div className="create-input">
                            <label className="label">Set name</label>
                            <input
                                className="input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="create-input">
                            <label className="label">Set surname</label>
                            <input
                                className="input"
                                type="text"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="btn" onClick={create}>
                        Create account
                    </button>
                </div>
            </div>
        </>
    );
}

export default Create;
