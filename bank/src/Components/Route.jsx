import { useContext } from 'react';
import Authorisation from './Authorisation';
import Bank from './Bank';
import { GlobalContext } from './GlobalContext';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';

function Route() {
    const { route } = useContext(GlobalContext);

    switch (route) {
        case 'home':
            return (
                <Authorisation allowUnauthenticated>
                    <HomePage />
                </Authorisation>
            );
        case 'bank':
            return (
                <Authorisation>
                    <Bank />
                </Authorisation>
            );
        case 'login':
            return <Login />;
        case 'register':
            return <Register />;
        default:
            return <HomePage />;
    }
}

export default Route;
