import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

function Messages() {

    const {messages} = useContext(GlobalContext);


    return (
        <div className='positive-msg'>
            {
                messages.map(m => <div key={m.id}>{m.text}</div>)
            }
        </div>
    );

}

export default Messages;
