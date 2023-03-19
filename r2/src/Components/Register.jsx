import { useContext, useState } from "react";
import axios from 'axios';
import { GlobalContext } from "./GlobalContext";

function Register() {

    const [error, setError] = useState(null);
    const [userName, setUserName] = useState('');
    const [userPsw, setUserPsw] = useState('');
    const [userPsw2, setUserPsw2] = useState('');

    const { setRoute } = useContext(GlobalContext);

    const register = _ => {

        if (userName.length < 3) {
            setError('Incorrect name');
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

        axios.post('http://localhost:3003/register', { userName, userPsw }, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                if (res.data.status === 'valid') {
                    setUserName('');
                    setUserPsw('');
                    setUserPsw2('');
                    setError(null);
                    setRoute('login');
                } else {
                    setError('Server error');
                }
            })
            .catch(error => {
                setError(error.response ? error.response.statusText : error.code
                );
            })
    }


    return (
        <div className="container">
            <div className="forms">
                <div className="login-container">
                    <div className="body">
                        <h5 className="title">
                            {
                                error ? <span style={{ color: 'crimson' }}>{error}</span> : <span>Register</span>
                            }
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
                            <label className="">Repeat password</label>
                            <input
                                type="password"
                                className=""
                                value={userPsw2}
                                onChange={(e) => setUserPsw2(e.target.value)}
                            />                            
                        </div>
                    </div>
                    <button className="btn" onClick={register}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;