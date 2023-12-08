import React from 'react';

function Sort({ setSort }) {
    return (
        <div className="sort-box">
            <button className="btn sort" onClick={() => setSort('name')}>
                Sort by Surame
            </button>
            <button className="btn sort" onClick={() => setSort('balance')}>
                Sort by Balance
            </button>
        </div>
    );
}

export default Sort;
