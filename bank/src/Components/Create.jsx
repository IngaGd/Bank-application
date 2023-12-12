import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useFile } from '../Use/useFile';
import { GlobalContext } from './GlobalContext';

function Create() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [balance, setBalance] = useState(0);
    const [file, readFile, remFile] = useFile();

    const { setCreateData, messages } = useContext(GlobalContext);

    useEffect(() => {
        console.log('Messages in Create Component:', messages);
    }, [messages]);

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
                        <label className="label">Choose image (.png) </label>
                        <input
                            className="input"
                            type="file"
                            onChange={readFile}
                        />
                    </div>
                </div>
                <div className="account-details">
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
                <div className="btn-box">
                    <button className="btn btn--create" onClick={create}>
                        Create account
                    </button>
                </div>
            </div>
            <div className="create-messages">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        {message.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Create;
