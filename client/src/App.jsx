import React from 'react';
import MessagePage from "./components/MessagePage";
import MessageList from "./components/MessageList";
import "./styles/MessageStyles.css";

function App() {
    const senderId = 1;
    const jobseekerId = 2;

    return (
        <div className="app-container">
            <MessagePage senderId={senderId} jobseekerId={jobseekerId} />
            <MessageList senderId={senderId} jobseekerId={jobseekerId}/>
        </div>
    );
}

export default App;