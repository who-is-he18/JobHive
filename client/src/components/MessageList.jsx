import React, { useEffect, useState } from 'react';

const MessageList = ({ senderId, jobseekerId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:5000/messages?senderId=${senderId}&receiverId=${jobseekerId}`);
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [senderId, jobseekerId]);

    return (
        <div className="message-list">
            <h3>Messages</h3>
            {messages.map((msg) => (
                <div key={msg.id} className="message-item">
                    <p><strong>{msg.senderId === senderId ? "You" : "Jobseeker"}:</strong> {msg.message}</p>
                    <p><small>{new Date(msg.timestamp).toLocaleString()}</small></p>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
