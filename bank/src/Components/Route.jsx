import { useContext } from 'react';
import Authorisation from './Authorisation';
import Bank from './Bank';
import { GlobalContext } from './GlobalContext';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import Users from './Users';

function Route() {
    const { route } = useContext(GlobalContext);

    switch (route) {
        case 'home': return <Authorisation roles={''}><HomePage /></Authorisation>
        case 'bank': return <Authorisation roles={'admin,manager'}>< Bank/></Authorisation>
        case 'users': return <Authorisation roles={'admin'}>< Users/></Authorisation>
        case 'login': return <Login />
        case 'register': return <Register />
        default: return null
    }
}

export default Route;
