import './style/app.scss';
import { GlobalContextProvider } from './Components/GlobalContext';
// import Nav from './Components/Nav';
// import Route from './Components/Route';
//import Bank from './Components/Bank';
import Nav from './Components/Nav';
//import Authorisation from './Components/Authorisation';
import Route from './Components/Route';



function App() {


    return (
          <GlobalContextProvider>
            {/* <Nav />
            <Authorisation>
              <Bank />
            </Authorisation> */}
            <Nav />
            <Route />

          </GlobalContextProvider>
    );
}

export default App;