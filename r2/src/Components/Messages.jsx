import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

function Messages() {

    const {messages} = useContext(GlobalContext);

    return (
        <div className="positive-msg">
            {messages && <div className="success">{messages}</div>}                 
        </div>
    )
}

export default Messages;
