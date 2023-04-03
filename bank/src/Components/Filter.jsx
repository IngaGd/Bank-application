function Filter({ setFilter }) {
    
  return (
    <div>
      <button className="filter-btn" onClick={() => setFilter('all')}>All accounts</button>
      <button className="filter-btn" onClick={() => setFilter('valid')}>Valid accounts</button>
      <button className="filter-btn" onClick={() => setFilter('empty')}>Empty accounts</button>
      <button className="filter-btn" onClick={() => setFilter('blocked')}>Blocked accounts</button>
      <button className="filter-btn" onClick={() => setFilter('unblocked')}>Unblocked accounts</button>
      <button className="filter-btn" onClick={() => setFilter('negative')}>Negative balance</button>
    </div>
  );
}


export default Filter;