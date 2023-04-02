import { useContext, useState } from "react";
import Create from "./Create";
import Filter from "./Filter";
import { GlobalContext } from "./GlobalContext";
import List from "./List";
import Messages from "./Messages";
import Totals from "./Totals";


function Bank() {

    const [filter, setFilter] = useState('all');
    const { reduceBalances } = useContext(GlobalContext);


    return (
        <>
            <h1 className="main-title">Bank application</h1>
            <div className="container">
                <Totals />
                <button onClick={reduceBalances}>Reduce All Balances by 5</button>
                <div className="content">
                    <div className="create">
                        <Create />
                    </div>
                    <div className="list">
                        <List filter={filter} />
                        <Messages />
                    </div>
                    <div className="filter">
                        <Filter setFilter={setFilter} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Bank;
