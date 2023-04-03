import { useContext, useState } from "react";
import Create from "./Create";
import Filter from "./Filter";
import { GlobalContext } from "./GlobalContext";
import List from "./List";
import Messages from "./Messages";
import Sort from "./Sort";
import Totals from "./Totals";


function Bank() {

    const [filter, setFilter] = useState('all');
    const { reduceBalances } = useContext(GlobalContext);
    const [sort, setSort] = useState('unsort');


    return (
        <>  
            <div className="taxes-container">
                <button className="taxes-btn" onClick={reduceBalances}>Reduce All Balances by 5</button>
            </div>

            <h1 className="main-title">Bank application</h1>
            <div className="container">
                <Totals />
                <div className="content">
                    <div className="create">
                        <Create />
                    </div>
                    <div className="list">
                        <List filter={filter} sort={sort}/>
                        <Messages />
                    </div>
                    <div className="filter">
                        <Filter setFilter={setFilter} />
                    </div>
                    <div className="sort">
                        <Sort setSort={setSort} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Bank;
