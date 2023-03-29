import './style/app.scss';
import { GlobalContextProvider } from './Components/GlobalContext';
import Bank from './Components/Bank';
import Authorisation from './Components/Authorisation';
import Nav from './Components/Nav';



function App() {
    return (
          <GlobalContextProvider>
            <Nav />
            <Authorisation>
              <>
              <Bank />
              </>
            </Authorisation>
          </GlobalContextProvider>
    );
}

export default App;
