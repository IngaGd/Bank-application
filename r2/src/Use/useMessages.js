import { useState, useEffect } from "react";


export const useMessages = init => {

    const [messages, setMessages] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessages(null);
            }, 2000)
        }
    }, [message])

    return [messages, setMessage];
}