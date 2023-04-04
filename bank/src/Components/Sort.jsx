import React from 'react';

function Sort({ setSort }) {
    return (
        <div className='sort-container'>
            <button className="sort-btn" onClick={() => setSort('name')}>Sort by Name</button>
            <button className="sort-btn" onClick={() => setSort('balance')}>Sort by Balance</button>
            {/* <button className="sort-btn" onClick={() => setSort('unsort')}>Unsort</button> */}
        </div>
    );
}

export default Sort;