import React, { useState } from "react";

const MessagePage = ({ jobseekerId, senderId }) => {
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (message.trim() === "") return;

        const newMessage = {
            senderId,
            receiverId: jobseekerId,
            message,
            timestamp: new Date().toISOString(),    
        };

        try {
            await fetch("http://localhost:5000/messages", {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify(newMessage),
            });
            setMessage("");
            alert("Message sent successfully!");
        } catch (error) {
            console.error("Error sending message: ", error);
            }
        };

return (
    <div className="message-page">
        <div className="user-info">
            <div className="user-icon"></div>
                <h2>Jobseeker's Name</h2>
        </div>
        <textarea
            value={message}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">
            Send Message
        </button>
    </div>
    );
};

export default MessagePage;