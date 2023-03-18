import { useState } from "react";
import Create from "./Create";
import Filter from "./Filter";
import List from "./List";
import Messages from "./Messages";


function Bank() {

    const [totalBalances, setTotalBalances] = useState(0);
    const [numAccounts, setNumAccounts] = useState(0);
    const [filter, setFilter] = useState('all');


    // useEffect(() => {
    //     if (null === list) {
    //         return;
    //     }
    //     const balances = list.reduce((sum, { balance }) => sum + balance, 0);
    //     setTotalBalances(balances);
    //     setNumAccounts(list.length);
    // }, [list]);


    return (
        <>
            <h1 className="main-title">Bank application</h1>
            <div className="container">
                <div className="totals">
                    Total balances: {totalBalances} | Number of accounts:{' '}
                    {numAccounts}
                </div>
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
