import { useEffect } from 'react';
import { useState } from 'react';
import Create from './Components/Bank-App-Server/Create';
import Filter from './Components/Bank-App-Server/Filter';
import List from './Components/Bank-App-Server/List';
import axios from 'axios';

import './Components/U1/style.scss';

const URL = 'http://localhost:3003/bank';

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

    //gaunam duomenis is serverio, kai uzkraunam psl
    useEffect(() => {
        axios.get(URL) //gaunam duomenis
        .then(res => {//kai gaunam duomenis, irasom i lista
            setList(res.data)
        });
    }, [lastUpdate]) //nuskaitom last update ir setinam i create ir delete

    //paprastas variantas be promisu
    useEffect(() => {
        if (null === createData) {//idedam, kai create data yra nulas, kad neprasisukinetu listinimas ir nesiustu null creata
            return; //kai create yra null, tada nieko nedarom
        }
        axios.post(URL, createData) //issiunciama create data i request body
        .then(res => {
            console.log(res.data);//kai ateina ats, kad padelitinta, setinamLastUpdate
            setLastUpdate(Date.now());//pasileidzia refresh automatishkai
        })
    }, [createData])

    useEffect(() => {
        if (null === deleteData) {
            return; 
        }
        axios.delete(URL + '/' + deleteData.id) //naudojam metoda delete
        //plius deleteData.id, perdavimas per parametrus (trinamo kauliuko id)
        .then(res => {
            console.log(res.data);
            setLastUpdate(Date.now()); //issitrina is karto pasileidziant refresui
        })
    }, [deleteData])

    useEffect(() => {
        if (null === editData) {
            return; 
        }
        axios.put(URL + '/' + editData.id, editData) //naudojam metoda put
        //plius editData.id, perdavimas per parametrus (trinamo kauliuko id)
        .then(res => {
            console.log(res.data);
            setLastUpdate(Date.now()); 
        })
    }, [editData])



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