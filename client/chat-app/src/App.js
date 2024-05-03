import './App.css';
import {useEffect, useState} from 'react';
import io from 'socket.io-client';

function App() {

  const [socket, setSocket] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [receiverId, setReceiverId] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:3500');
    setSocket(newSocket);
    
    newSocket.on('userLogged', (users) => {
      setConnectedUsers(users);
    });

    newSocket.on('newMessage', (message) => {
      setMessageInput((prevMessages => [...prevMessages, message]));
    });

    return () => {
      newSocket.close();
    }
  }, []);

  const handleLogin = () => {
    if (socket && loggedInUser) {
      socket.emit('login', loggedInUser);

    }
  };

  const handleSendMessage = () => {
    if (socket && messageInput.trim() !== '' && receiverId) {
      const newMessage = {
        senderId: loggedInUser,
        receiverId: receiverId,
        content: messageInput.trim(),
      };
      socket.emit('message', newMessage);
      setMessageInput('');
    }
  };
  
  
  return (
    <div className="App">
     {loggedInUser ? (
      <div>
        <h2>Chat App - Logged in as {loggedInUser}</h2>
        <div>
          <h3>Connected users: </h3>
          <ul>
            {connectedUsers.map((user) => (
              <li key={user}>
                {user} 
                <button onClick={() => setReceiverId(user)}> Send message</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Messages: </h3>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>
                {message.senderId} : {message.content}
              </li>
            ))}
          </ul>
        </div>

        <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)}/>
        <button onClick={handleSendMessage}>Send</button>
      </div>
     ) : (
      <div>
        <h2>Chat App</h2>
        <input type="text" placeholder='Enter your name' value={loggedInUser} onChange={(e) => setLoggedInUser(e.target.value)}/>
        <button onClick={handleLogin}>Login</button>
      </div>
     )} 
    </div>
  );
}

export default App;
