import { useContext, useState } from 'react';
import Create from './Create';
import Filter from './Filter';
import { GlobalContext } from './GlobalContext';
import List from './List';
import Messages from './Messages';
import Sort from './Sort';
import Totals from './Totals';

function Bank() {
    const [filter, setFilter] = useState('all');
    const { reduceBalances } = useContext(GlobalContext);
    const [sort, setSort] = useState('unsort');

    return (
        <>
            <div className="container">
                <div className="info">
                    <h1 className="info__main-title">Your accounts</h1>
                    <div className="info__totals-container">
                        <Totals />
                    </div>
                    <div className="info__taxes-container">
                        <button
                            className="info__btn btn--tax"
                            onClick={reduceBalances}
                        >
                            TAXES: Reduce All Balances by 5
                        </button>
                    </div>
                </div>
            </div>

            {/* <div className="root-container"> */}
            <div className="main-title-container">
                <div className="container">
                    <div className="content">
                        <div className="create">
                            <Create />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container list">
                <div className="content">
                    <div className="list">
                        <List filter={filter} sort={sort} />
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
            {/* </div> */}
        </>
    );
}
export default Bank;
