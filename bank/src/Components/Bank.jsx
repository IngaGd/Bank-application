import { useState } from 'react';
import Create from './Create';
import Filter from './Filter';
import Info from './Info';
import List from './List';
import Messages from './Messages';
import Nav from './Nav';
import Sort from './Sort';

function Bank() {
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('unsort');

    return (
        <div className="container">
            <Nav />
            <Info />
            <Create />
            <List filter={filter} sort={sort} />
            <Messages />
            <Filter setFilter={setFilter} />
            <Sort setSort={setSort} />
        </div>
    );
}
export default Bank;
