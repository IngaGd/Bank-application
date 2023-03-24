import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";


function ListOfUsers() {

    const {users} = useContext(GlobalContext);

    return (
        <div className="container-users">
            <div className="content-users">
                <div className="list-users">
                    <ul className="users">
                        {
                            users?.map(u => (<li key={u.id}>{u.name}</li>))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ListOfUsers;
