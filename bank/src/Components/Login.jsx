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
                    setError(true);
                }
            });
    };

    return (
        <div className="container">
            <Nav />
            <div className="login">
                <div className="body">
                    <h5 className="title">
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
    );
}

export default Login;
