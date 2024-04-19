const express = require('express');
const http = require('http');
const cors = require('cors');
const socketLogic = require('./services/socketLogic');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3500;
const server = http.createServer(app);
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.use('/users', require('./routes/users'));
app.use('/messages', require('./routes/messages'));

const io = socketLogic.initializeSocket(server);

server.listen(PORT, () => console.log(`Server running at Port ${PORT}`));