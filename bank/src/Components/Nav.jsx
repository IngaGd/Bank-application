import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

function Nav() {
    const { route, setRoute, authName, logOut } = useContext(GlobalContext);

    return (
        <nav className="navigation">
            <div className="nav__left">
                <div className="nav__left--link">
                    <span
                        onClick={(_) => setRoute('home')}
                        className={route === 'home' ? 'active' : ''}
                    >
                        Home
                    </span>
                </div>
                <div className="nav__left--link">
                    <span
                        onClick={(_) => setRoute('bank')}
                        className={route === 'bank' ? 'active' : ''}
                    >
                        Bank
                    </span>
                </div>
            </div>
            <div className="nav__right">
                {authName ? (
                    <>
                        <div className="nav__right--link">
                            <span className="item">
                                <b>{authName}</b>
                            </span>
                        </div>
                        <div className="nav__right--link">
                            <span className="item" onClick={logOut}>
                                Logout
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="nav__right--link">
                            <span
                                onClick={(_) => setRoute('login')}
                                className="item"
                            >
                                Login
                            </span>
                        </div>
                        <div className="nav__right--link">
                            <span
                                onClick={(_) => setRoute('register')}
                                className="item"
                            >
                                Register
                            </span>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Nav;
