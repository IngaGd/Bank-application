import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

function Nav() {
    const { route, setRoute, authName, logOut } = useContext(GlobalContext);

    return (
        <nav>
            <ul>
                <li className="item">
                    <span onClick={_ => setRoute('home')} className={route === 'home' ? 'active' : ''}>Home</span>
                </li>
                <li className="item">
                    <span onClick={_ => setRoute('bank')} className={route === 'bank' ? 'active' : ''}>Bank</span>
                </li>
            </ul>
            <ul className="navbar-right">
                {authName ? (
                    <>
                        <li className="item">
                            <span className="link">
                                <b>{authName}</b>
                            </span>
                        </li>
                        <li className="item">
                            <span className="link" onClick={logOut}>
                                Logout
                            </span>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="item">
                            <span onClick={(_) => setRoute('login')} className="link">Login</span>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Nav;

