import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

function Nav() {
    const { route, setRoute, authName, logOut } = useContext(GlobalContext);

    return (
        <nav>
            <ul>
                <li>
                    <a
                        onClick={(_) => setRoute('bank')}
                        className={route === 'bank' ? 'active' : ''}
                        href="/bank"
                    >
                        Bank
                    </a>
                </li>
                {/* <li>
                    <a
                        onClick={(event) => {
                            event.preventDefault();
                            setRoute('login');
                        }}
                        className={route === 'login' ? 'active' : ''}
                        href="/login"
                    >
                        Login
                    </a>
                </li> */}
            </ul>
            <ul className="navbar-right">
                {authName ? (
                    <>
                        <li className="item">
                            <span className="nav-link">
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
                            <span
                                onClick={(_) => setRoute('login')}
                                className="link"
                            >
                                Login
                            </span>
                        </li>
                        <li className="item">
                            <span
                                onClick={(_) => setRoute('register')}
                                className="link"
                            >
                                Register
                            </span>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Nav;
