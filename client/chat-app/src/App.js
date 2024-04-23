import './App.css';
import {useEffect, useState} from 'react';
import io from 'socket.io-client';

function App() {
  const serverURL = "http://localhost:3500";

  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(serverURL);
    setSocket(newSocket);
  
    return () => {
      newSocket.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('receiveMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('userList', (data) => {
      setUserList(data);
    })
  
    return () => {
      socket.off('receiveMessage');
      socket.off('userList');
    }
  }, [socket]);

  const handleSendMessage = () => {
    if (!selectedUser || !message) return;
    socket.emit('sendMessage', {to: selectedUser, message});
    setMessage('');
  };
  
  
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
