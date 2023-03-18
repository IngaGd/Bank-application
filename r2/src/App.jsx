import './style/app.scss';
import { GlobalContextProvider } from './Components/GlobalContext';
import Nav from './Components/Nav';
import Route from './Components/Route';


function App() {


    return (
          <GlobalContextProvider>
            <Nav />

            <Route />

          </GlobalContextProvider>
    );
}

export default App;