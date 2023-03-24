import './style/app.scss';
import { GlobalContextProvider } from './Components/GlobalContext';
import Users from './Components/Users';
import ListOfUsers from './Components/ListOfUsers';



function App() {
    return (
          <GlobalContextProvider>
            <ListOfUsers />
          </GlobalContextProvider>
    );
}

export default App;
