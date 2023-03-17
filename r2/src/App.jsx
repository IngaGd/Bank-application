import { useState} from 'react';
import Create from './Components/Create';
import Filter from './Components/Filter';
import List from './Components/List';


import './style/app.scss';
import { GlobalContextProvider } from './Components/GlobalContext';
import Messages from './Components/Messages';
import Login from './Components/Login';
import CookiesSetter from './Components/CookiesSetter';

function App() {

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
          <GlobalContextProvider>
            <div className='forms'>
                <CookiesSetter />
                <Login />
            </div>
            <h1 className='main-title'>Bank application</h1>
            <div className='container'>
                <div className='totals'>
                    Total balances: {totalBalances} | Number of accounts: {numAccounts}
                </div>
                <div className='content'>
                    <div className='create'>
                        <Create />
                    </div>
                    <div className='list'>
                        <List 
                            filter={filter}                                      
                        />
                        <Messages />
                    </div>
                    <div className='filter'>
                        <Filter setFilter={setFilter} />
                    </div>
                </div>

            </div>
          </GlobalContextProvider>
    );
}

export default App;