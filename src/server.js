const express = require('express');
const http = require('http');
const initializeSocket = require('./services/socketLogic');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3500;
const server = http.createServer(app);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

const io = initializeSocket(server);

server.listen(PORT, () => console.log(`Server running at Port ${PORT}`));