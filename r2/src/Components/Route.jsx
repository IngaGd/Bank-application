import { useContext } from 'react';
import Authorisation from './Authorisation';
import Bank from './Bank';
import { GlobalContext } from './GlobalContext';
import Login from './Login';
import Register from './Register';
import Users from './Users';

function Route() {
    const { route } = useContext(GlobalContext);

    switch (route) {
        case 'bank': return < Bank/>
        case 'users': return <Authorisation>< Users/></Authorisation>
        case 'login': return <Login />
        case 'register': return <Register />
        default: return null
    }
}

export default Route;
