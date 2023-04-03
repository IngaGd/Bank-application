import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

function Totals() {

    const { totalBalances, numAccounts, numWithImages, numWithDefaultImage, numWithZeroBalance, numWithPositiveBalance, numWithNegativeBalance } = useContext(GlobalContext);


    return (
        
        <div className="totals">
            Total balances: {totalBalances} <br/>
            Number of accounts: {numAccounts} <br/>
            Number of accounts with uploaded images: {numWithImages} <br/>
            Number of accounts with default image: {numWithDefaultImage} <br/>
            Number of accounts with zero balance: {numWithZeroBalance} <br/>
            Number of accounts with positive balance: {numWithPositiveBalance} <br/>
            Number of accounts with negative balance: {numWithNegativeBalance} <br/>
        </div>
    );
}


export default Totals;
