import './style/app.scss';
import { GlobalContextProvider } from './Components/GlobalContext';
import Bank from './Components/Bank';
import Authorisation from './Components/Authorisation';



function App() {
    return (
          <GlobalContextProvider>
            <Authorisation>
              <>
              <Bank />
              </>
            </Authorisation>
          </GlobalContextProvider>
    );
}

export default App;
