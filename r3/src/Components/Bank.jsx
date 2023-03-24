import { useState } from "react";
import Create from "./Create";
import Filter from "./Filter";
import List from "./List";
import Messages from "./Messages";
import Totals from "./Totals";


function Bank() {

    const [filter, setFilter] = useState('all');


    return (
        <>
            <h1 className="main-title">Bank application</h1>
            <div className="container">
                <div className="content">
                    <div className="create">
                        <Create />
                    </div>
                    <div className="list">
                        <List filter={filter} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Bank;
