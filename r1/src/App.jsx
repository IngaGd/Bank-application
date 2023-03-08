import { useEffect } from 'react';
import { useState } from 'react';
import Create from './Components/U1/Create';
import Filter from './Components/U1/Filter';
import List from './Components/U1/List';
import { create, read, destroy, edit } from './Components/U1/localStorage';
import './Components/U1/style.scss';

const KEY = 'Account';

function App() {
    const [createData, setCreateData] = useState(null);
    const [list, setList] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [deleteModal, setDeleteModal] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [editData, setEditData] = useState(null);
    const [editModal, setEditModal] = useState(null);
    const [totalBalances, setTotalBalances] = useState(0);
    const [numAccounts, setNumAccounts] = useState(0);
    const [filter, setFilter] = useState('all');
    const [deleteSuccessMsg, setDeleteSuccessMsg] = useState(null);
    const [editSuccessMsg, setEditSuccessMsg] = useState(null);

    useEffect(() => {
        if (deleteSuccessMsg) {
            setTimeout(() => {
                setDeleteSuccessMsg(null);
            }, 2000);
        }
    }, [deleteSuccessMsg]);


    useEffect(() => {
        if (editSuccessMsg) {
            setTimeout(() => {
                setEditSuccessMsg(null);
            }, 2000);
        }
    }, [editSuccessMsg]);


    useEffect(() => {
        setList(read(KEY));
    }, [lastUpdate]);

    useEffect(() => {
        if (null === createData) {
            return;
        }
        create(KEY, createData);
        setLastUpdate(Date.now());      
    }, [createData]);

    useEffect(() => {
        if (null === deleteData) {
            return;
        }
        destroy(KEY, deleteData.id);
        setDeleteSuccessMsg("Account was successfully deleted");
        setLastUpdate(Date.now());
    }, [deleteData]);

    useEffect(() => {
        if (null === editData) {
            return;
        }
        edit(KEY, editData, editData.id);
        setEditSuccessMsg("Balance was successfully changed");
        setLastUpdate(Date.now());
    }, [editData]);

    useEffect(() => {
        if (null === list) {
            return;
        }
        const balances = list.reduce((sum, { balance }) => sum + balance, 0);
        setTotalBalances(balances);
        setNumAccounts(list.length);
    }, [list]);

    return (
        <>
            <h1 className='main-title'>Bank application</h1>
            <div className='container'>
                <div className='totals'>
                    Total balances: {totalBalances} | Number of accounts: {numAccounts}
                </div>
                <div className='content'>
                    <div className='create'>
                        <Create setCreateData={setCreateData}/>
                    </div>
                    <div className='list'>
                        <List 
                            list={list} 
                            setDeleteModal={setDeleteModal} 
                            deleteModal={deleteModal}
                            setDeleteData={setDeleteData}
                            editModal={editModal}
                            setEditModal={setEditModal}
                            setEditData={setEditData} 
                            filter={filter}
                            deleteSuccessMsg={deleteSuccessMsg} 
                            editSuccessMsg={editSuccessMsg}                                                
                        />
                    </div>
                    <div className='filter'>
                        <Filter setFilter={setFilter} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;