import { useContext } from 'react';
import Authorisation from './Authorisation';
import Bank from './Bank';
import { GlobalContext } from './GlobalContext';
import Login from './Login';
import Users from './Users';

function Route() {
    const { route } = useContext(GlobalContext);

    switch (route) {
        case 'bank': return < Bank/>
        case 'users': return <Authorisation>< Users/></Authorisation>
        case 'login': return <Login />
        default: return null
    }
}

export default Route;
