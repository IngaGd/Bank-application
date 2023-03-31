import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

function Totals() {

    const {totalBalances, numAccounts} = useContext(GlobalContext);

    return (
        <div className="totals">
            Total balances: {totalBalances} | Number of accounts: {numAccounts}
        </div>
    );
}

export default Totals;
