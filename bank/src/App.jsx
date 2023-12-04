import './style/app.scss';
// import './style/main.scss';
import { GlobalContextProvider } from './Components/GlobalContext';
// import Nav from './Components/Nav';
// import Route from './Components/Route';
//import Bank from './Components/Bank';
//import Authorisation from './Components/Authorisation';
import Route from './Components/Route';

function App() {
    return (
        <GlobalContextProvider>
            <Route />
        </GlobalContextProvider>
    );
}

export default App;
