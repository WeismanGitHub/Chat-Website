import React, { useState, useEffect } from 'react';
import { getCookie } from '../../../helpers'

function ChatBox({ socket, roomId }) {
    const [currentMessage, setCurrentMessage] = useState('')
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages((list) => [...list, data]);
        });

        socket.on('connect_error', (err) => {
            console.log(err.message)
        })
    }, [socket]);
    
    
    const sendMessage = async () => {
        if (currentMessage !== '') {
        const messageData = {
            roomId: roomId,
            message: currentMessage,
            auth: {
                token: getCookie('token')
            }
        };

        socket.volatile.emit('send_message', messageData);
        setMessages((list) => [...list, { message: currentMessage, userName: 'You' }]);
        setCurrentMessage('');
        }
    };

    return (
        <div class='chatBox'>
            {messages.map(message => {
                return (
                    <div>
                    <b>{message.userName}</b>: {message.message}
                    </div>
                )
            })}
            <br/>
            <input
            type='text'
            value={currentMessage}
            placeholder='...'
            onChange={(event) => {setCurrentMessage(event.target.value)}}
            onKeyPress={(event) => {event.key === 'Enter' && sendMessage()}}
            />
            <button onClick={sendMessage}>Send</button>
            <br/>
        </div>
    )
}

export default ChatBox;