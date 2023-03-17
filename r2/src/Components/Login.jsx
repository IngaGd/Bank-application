import axios from 'axios';
import { useState } from 'react';

function Login() {

    const [userName, setUserName] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const login = _ => {
        axios.post('http://localhost:3003/cookies', {user, password}, {withCredentials: true})
        .then(res => {
            console.log(res.data);
        })
    }

    return (
        <div className="login-container">
            <div className="body">
                <h5 className="title">Login</h5>
                <div className="">
                    <label className="">User</label>
                    <input type="text" className="" value={user} onChange={(e) => setUser(e.target.value)}
                    />
                    <label className="">Password</label>
                    <input type="password" className="" value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <button className="btn" onClick={login}>Login</button>
        </div>
    );
}

export default Login;
