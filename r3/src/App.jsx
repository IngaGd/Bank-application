import Bank from './Components/Bank';
import { GlobalContextProvider } from './Components/GlobalContext';
import './style/app.scss';

function App() {
  return (
    <GlobalContextProvider>
      <Bank />
    </GlobalContextProvider>
  );
}

export default App;
