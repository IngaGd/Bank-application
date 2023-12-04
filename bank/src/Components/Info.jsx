import React from 'react';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

export default function Info() {
    const { reduceBalances } = useContext(GlobalContext);
    return (
        <div className="info">
            <h1 className="info__main-title">Your accounts</h1>
            <div className="info__taxes-container">
                <button className="btn--tax" onClick={reduceBalances}>
                    TAXES: Reduce All Balances by 5
                </button>
            </div>
        </div>
    );
}
