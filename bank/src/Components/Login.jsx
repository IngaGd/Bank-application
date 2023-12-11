import { useContext, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from './GlobalContext';
import Nav from './Nav';

const URL = process.env.REACT_APP_URL || 'http://localhost:3003/';
const loginURL = `${URL}login`;

function Login() {
    const [error, setError] = useState(null);

    //suvedam interface
    const [userName, setUserName] = useState('');
    const [userPsw, setUserPsw] = useState('');

    const { setLogged, setAuthName, updateAccounts, setRoute } =
        useContext(GlobalContext);

    const login = (_) => {
        axios
            .post(loginURL, { userName, userPsw }, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                if (res.data.status === 'valid') {
                    setUserName('');
                    setUserPsw('');
                    setError(null);
                    setLogged(1); //kai prisijunge loginas = 1
                    setAuthName(res.data.getName);
                    setRoute('bank');
                    updateAccounts(Date.now()); //po login updatinam accounta
                } else {
                    setTimeout(() => {
                        setError(true);
                        setTimeout(() => {
                            setError(false);
                        }, 3000);
                    }, 0);
                }
            });
    };

    return (
        <div className="container">
            <Nav />
            <div className="login">
                <div className="login__body">
                    <h5 className="login__title">
                        {error ? (
                            <span className="error-message">
                                Error to login
                            </span>
                        ) : (
                            <span></span>
                        )}{' '}
                        Login
                    </h5>
                    <div className="login__input-group">
                        <label className="login__label">User</label>
                        <input
                            type="text"
                            className="login__input"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <label className="login__label">Password</label>
                        <input
                            type="password"
                            className="login__input"
                            value={userPsw}
                            onChange={(e) => setUserPsw(e.target.value)}
                        />
                    </div>
                    <button className="login__button btn" onClick={login}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
