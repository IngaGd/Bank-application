import React from 'react';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import Totals from './Totals';

export default function Info() {
    const { reduceBalances } = useContext(GlobalContext);
    return (
        <div className="info">
            <h1 className="info__main-title">Your accounts</h1>
            <Totals />
            <div className="info__taxes-container">
                <button className="btn--tax" onClick={reduceBalances}>
                    TAXES: Reduce All Balances by 5
                </button>
            </div>
        </div>
    );
}
