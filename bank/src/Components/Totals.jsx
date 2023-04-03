import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

function Totals() {

    const { totalBalances, numAccounts, numWithImages, numWithDefaultImage, numWithZeroBalance, numWithPositiveBalance, numWithNegativeBalance } = useContext(GlobalContext);


    return (
        <div className="totals">
            Total balances: {totalBalances} | Number of accounts: {numAccounts} | Number of accounts with uploaded images: {numWithImages} | Number of accounts with default image: {numWithDefaultImage}
             | Number of accounts with zero balance: {numWithZeroBalance} | Number of accounts with positive balance: {numWithPositiveBalance} | Number of accounts with negative balance: {numWithNegativeBalance}
        </div>
    );
}


export default Totals;
