import { useContext } from "react";
import { useEffect } from "react";
import { GlobalContext } from "./GlobalContext";

function Users() {

    const {users, setDeleteUser} = useContext(GlobalContext);

    useEffect(() => {

    }, [])

    return (
        <>
        <div className="container">
            <div className="content">
                <div className="list">
                    <ul>
                        {
                            users?.map(u => (<li key={u.id} className="">
                                <div>
                                    <div>
                                        <h2>{u.name}</h2>
                                    </div>
                                    <div>
                                        <button type="button" className="btn" onClick={_=> setDeleteUser(u)}>Delete</button>
                                    </div>
                                </div>
                            </li>))
                        }
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
}

export default Users;
