import { useContext } from 'react';
import Bank from './Bank';
import { GlobalContext } from './GlobalContext';
import Login from './Login';

function Route() {
    const { route } = useContext(GlobalContext);

    switch (route) {
        case 'bank': return < Bank/>
        case 'login': return <Login />
        default: return null
    }
}

export default Route;
