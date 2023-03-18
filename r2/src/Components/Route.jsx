import { useContext } from 'react';
import Authentication from './Authentication';
import Bank from './Bank';
import { GlobalContext } from './GlobalContext';
import Login from './Login';

function Route() {
    const { route } = useContext(GlobalContext);

    switch (route) {
        case 'bank': return <Authentication>< Bank/></Authentication>
        case 'login': return <Login />
        default: return null
    }
}

export default Route;
