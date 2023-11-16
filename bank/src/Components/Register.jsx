import React, { useContext, useState } from 'react';
import { GlobalContext } from './GlobalContext';

export default function Register() {
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState('');
    const [userPsw, setUserPsw] = useState('');
    const [userPsw2, setUserPsw2] = useState('');

    const { setRoute } = useContext(GlobalContext);

    const register = (_) => {
        if (userName.length < 3) {
            setError('Incorrect name, should be at least 3 characters');
            return;
        }
        if (userPsw.length < 3) {
            setError('Weak password');
            return;
        }
        if (userPsw !== userPsw2) {
            setError('Repeated password should be the same');
            return;
        }
        const postData = async () => {
            try {
                const response = await fetch('http://localhost:3003/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userName, userPsw }),
                    credentials: 'include',
                });
                const data = await response.json();
                if (data.status === 'valid') {
                    setUserName('');
                    setUserPsw('');
                    setUserPsw2('');
                    setError(null);
                    setRoute('login');
                } else {
                    setError(data.message || `Error: ${response.status}`);
                }
                console.log(data.status, userName, userPsw);
            } catch (error) {
                setError(`Network error: ${error.message}`);
            }
        };
        return postData();
    };

    return (
        <div className="container">
            <div className="login-form">
                <div className="login-form_box">
                    <div className="login-form_box-content">
                        <h5 className="title">
                            {error && (
                                <span style={{ color: 'red' }}>
                                    Error: {error}
                                </span>
                            )}
                        </h5>
                        <div>
                            <label className="">User</label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <label className="">Password</label>
                            <input
                                type="password"
                                value={userPsw}
                                onChange={(e) => setUserPsw(e.target.value)}
                            />
                            <label className="">Repeat password</label>
                            <input
                                type="password"
                                value={userPsw2}
                                onChange={(e) => setUserPsw2(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="btn_login" onClick={register}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}
