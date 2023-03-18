import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

function Login() {
    //ateina is servo
    const [savedUser, setSavedUser] = useState(null);
    const [error, setError] = useState(null);

    //suvedam interface
    const [userName, setUserName] = useState('');
    const [userPsw, setUserPsw] = useState('');

     //jei atpazistam pagal cookie, paliekam prisijungusi. sita vieta eina i interneta ir ima prisijungimo duomenis
    useEffect(() => {
        axios.get('http://localhost:3003/login', { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                if (res.data.status === 'valid') {
                    setSavedUser(res.data.getName);
                }
            });
    }, []);



    const login = (_) => {
        axios
            .post(
                'http://localhost:3003/login',
                { userName, userPsw },
                { withCredentials: true }
            )
            .then((res) => {
                console.log(res.data);
                if (res.data.status === 'valid') {
                    setSavedUser(res.data.getName);
                    setUserName('');
                    setUserPsw('');
                    setError(null);
                } else {
                    setError(true);
                    setSavedUser(null);
                }
            });
    };

    return (
        <div className="container">
            <div className="forms">
                <div className="login-container">
                    <div className="body">
                        <h5 className="title">
                            {savedUser ? (
                                <span>Hello, {savedUser}</span>
                            ) : (
                                <span>Login</span>
                            )}
                            {error ? (
                                <span style={{ color: 'red' }}> Error</span>
                            ) : (
                                <span></span>
                            )}
                        </h5>
                        <div className="">
                            <label className="">User</label>
                            <input
                                type="text"
                                className=""
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <label className="">Password</label>
                            <input
                                type="password"
                                className=""
                                value={userPsw}
                                onChange={(e) => setUserPsw(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="btn" onClick={login}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
