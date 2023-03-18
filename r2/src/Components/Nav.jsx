import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

function Nav() {
    const { route, setRoute } = useContext(GlobalContext);

    return (
        <nav>
            <ul>
                <li>
                    <a
                        onClick={(_) => setRoute('bank')}
                        className={route === 'bank' ? 'active' : ''}
                        href="/bank"
                    >
                        Home
                    </a>
                </li>
                <li>
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
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
