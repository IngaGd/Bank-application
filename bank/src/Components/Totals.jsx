import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

function Totals() {
    const {
        totalBalances,
        numAccounts,
        numWithImages,
        numWithDefaultImage,
        numWithZeroBalance,
        numWithPositiveBalance,
        numWithNegativeBalance,
    } = useContext(GlobalContext);

    return (
        <div className="totals">
            <div className="totals__content">
                Total balances: <span>{totalBalances}</span>
                <br />
                Number of accounts: <span>{numAccounts}</span>
                <br />
                Number of accounts with uploaded images:{' '}
                <span>{numWithImages}</span>
                <br />
                Number of accounts with default image:{' '}
                <span>{numWithDefaultImage}</span>
                <br />
                Number of accounts with zero balance:{' '}
                <span>{numWithZeroBalance}</span> <br />
                Number of accounts with positive balance:{' '}
                <span>{numWithPositiveBalance}</span>
                <br />
                Number of accounts with negative balance:{' '}
                <span>{numWithNegativeBalance}</span>
                <br />
            </div>
        </div>
    );
}

export default Totals;
