import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

function Messages() {
    const { messages } = useContext(GlobalContext);

    return (
        <div className="message">
            <div className="positive">
                {messages.map((m) => (
                    <div key={m.id}>{m.text}</div>
                ))}
            </div>
        </div>
    );
}

export default Messages;
