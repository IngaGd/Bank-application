import './style/app.scss';
import { GlobalContextProvider } from './Components/GlobalContext';
import Bank from './Components/Bank';



function App() {
    return (
          <GlobalContextProvider>
            <Bank />
          </GlobalContextProvider>
    );
}

export default App;
