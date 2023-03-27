import './style/app.scss';
import { GlobalContextProvider } from './Components/GlobalContext';
import ListOfAccounts from './Components/ListOfAccount';
import CreateAccount from './Components/CreateAccount';
import Bank from './Components/Bank';



function App() {
    return (
          <GlobalContextProvider>
            <Bank />
          </GlobalContextProvider>
    );
}

export default App;
