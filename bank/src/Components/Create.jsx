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
        <div className="create">
            <div className="title">Create account</div>
            <div className="row">
                <div className="content">
                    <div className="file-upload">
                        <div className="file-upload__container">
                            <div className="image-box">
                                {file ? (
                                    <img
                                        className="image"
                                        src={file}
                                        alt="upload"
                                    />
                                ) : null}
                            </div>
                        </div>

                        <div className="file-upload__input-group">
                            <label className="label">
                                Choose image (.png){' '}
                            </label>
                            <input
                                className="input"
                                type="file"
                                onChange={readFile}
                            />
                        </div>
                    </div>
                    <div className="account-details">
                        <div className="input-group">
                            <div className="input-box">
                                <label className="label">Set name</label>
                                <input
                                    className="input"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="input-box">
                                <label className="label">Set surname</label>
                                <input
                                    className="input"
                                    type="text"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <button className="btn--create" onClick={create}>
                        Create account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Create;
