import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

function Totals() {

    const { totalBalances, numAccounts, numWithImages, numWithDefaultImage } = useContext(GlobalContext);
      console.log(`Number of accounts with images: ${numWithImages}`);
  console.log(`Number of accounts with default image: ${numWithDefaultImage}`);

    return (
        <div className="totals">
            Total balances: {totalBalances} | Number of accounts: {numAccounts} | Number of accounts with uploaded images: {numWithImages} | Number of accounts with default image: {numWithDefaultImage}
        </div>
    );
}


export default Totals;
