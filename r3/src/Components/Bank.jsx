import ListOfAccount from './ListOfAccount';
import CreateAccount from "./CreateAccount";
import EditAccount from './EditAccount';


function Bank() {

    // const [filter, setFilter] = useState('all');


    return (
        <>
            <h1 className="main-title">Bank application</h1>
            <div className="container">
                <div className="content">
                    <div className="create">
                        <CreateAccount />  
                    </div>
                    <div className="list">
                        <ListOfAccount />
                    </div>              
                </div>
            </div>
            <EditAccount />
        </>
    );
}
export default Bank;
