function Filter({ setFilter }) {
    
  return (
    <div>
      <button className="filter-btn" onClick={() => setFilter('all')}>All accounts</button>
      <button className="filter-btn" onClick={() => setFilter('valid')}>Valid accounts</button>
      <button className="filter-btn" onClick={() => setFilter('empty')}>Empty accounts</button>
    </div>
  );
}


export default Filter;