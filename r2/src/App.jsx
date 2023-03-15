import { useEffect } from 'react';
import { useState } from 'react';
import Create from './Components/Create';
import Filter from './Components/Filter';
import List from './Components/List';
import axios from 'axios';

import './style/app.scss';
import { GlobalContextProvider } from './Components/GlobalContext';
import Messages from './Components/Messages';

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
    // const [createSuccessMsg, setCreateSuccessMsg] = useState(null);    
    // const [deleteSuccessMsg, setDeleteSuccessMsg] = useState(null);
    // const [editSuccessMsg, setEditSuccessMsg] = useState(null);


    // useEffect(() => {
    //     if (createSuccessMsg) {
    //         setTimeout(() =>{
    //             setCreateSuccessMsg(null);
    //         }, 2000)
    //     }
    // }, [createSuccessMsg])

    // useEffect(() => {
    //     if (deleteSuccessMsg) {
    //         setTimeout(() => {
    //             setDeleteSuccessMsg(null);
    //         }, 2000);
    //     }
    // }, [deleteSuccessMsg]);

    // useEffect(() => {
    //     if (editSuccessMsg) {
    //         setTimeout(() => {
    //             setEditSuccessMsg(null);
    //         }, 2000);
    //     }
    // }, [editSuccessMsg]);

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
            //addMessage({text: res.data.message.text});
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
            //addMessage({text: res.data.message.text});
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
            //addMessage({text: res.data.message.text});
        })
    }, [editData])

    useEffect(() => {
        if (null === list) {
            return;
        }
        const balances = list.reduce((sum, { balance }) => sum + balance, 0);
        setTotalBalances(balances);
        setNumAccounts(list.length);
    }, [list]);

    return (
          <GlobalContextProvider>
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
                            // createSuccessMsg={createSuccessMsg}
                            // deleteSuccessMsg={deleteSuccessMsg} 
                            // editSuccessMsg={editSuccessMsg}                                         
                        />
                    </div>
                    <div className='filter'>
                        <Filter setFilter={setFilter} />
                    </div>
                    <div>
                      <Messages />
                    </div>
                </div>
            </div>
          </GlobalContextProvider>
    );
}

export default App;