import { useState } from 'react';
import axios from 'axios';

const URL = process.env.REACT_APP_URL || 'http://localhost:3003/';
const cookiesURL = `${URL}cookies`;

function CookiesSetter() {
    const [cookie, setCookie] = useState('');

    const set = (_) => {
        axios
            .post(cookiesURL, { cookie }, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
            });
    };

    const del = (_) => {
        axios
            .delete(cookiesURL, { delete: true }, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
            });
    };

    return (
        <div className="cookie-container">
            <div className="body">
                <h5 className="title">Cookies</h5>
                <div className="">
                    <label className="">Cookie Text</label>
                    <input
                        type="text"
                        className=""
                        value={cookie}
                        onChange={(e) => setCookie(e.target.value)}
                    />
                </div>
            </div>
            {/* paklikine paleidziam funkcija set */}
            <button className="btn" onClick={set}>
                Set
            </button>
            {/* cookio trinimas: */}
            <button className="btn" onClick={del}>
                Delete
            </button>
        </div>
    );
}

export default CookiesSetter;
