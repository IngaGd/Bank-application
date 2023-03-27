import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

function ListOfAccount() {
    const { accounts } = useContext(GlobalContext);

    return (
        <>
            <div className="title">
                List of accounts
            </div>
            <div className="client-list">
                {
                    accounts?.map(a => <div key={a.id} className="client">
                        <div className="client-data"><span className="label-text">Name:</span> <span className="input-text">{a.name}</span></div>
                        <div className="client-data"><span className="label-text">Surname:</span> <span className="input-text">{a.surname}</span></div>
                        <div className="client-data"><span className="label-text">Balance:</span> <span className="input-text">{a.balance}</span></div>
                    </div>)
                }

            </div>
        </>
    );
}


export default ListOfAccount;
