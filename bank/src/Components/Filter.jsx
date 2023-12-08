function Filter({ setFilter }) {
    return (
        <div className="filter-box">
            <button className="btn filter" onClick={() => setFilter('all')}>
                All accounts
            </button>
            <button className="btn filter" onClick={() => setFilter('valid')}>
                Valid accounts
            </button>
            <button className="btn filter" onClick={() => setFilter('empty')}>
                Empty accounts
            </button>
            <button className="btn filter" onClick={() => setFilter('blocked')}>
                Blocked accounts
            </button>
            <button
                className="btn filter"
                onClick={() => setFilter('unblocked')}
            >
                Unblocked accounts
            </button>
            <button
                className="btn filter"
                onClick={() => setFilter('negative')}
            >
                Negative balance
            </button>
        </div>
    );
}

export default Filter;
