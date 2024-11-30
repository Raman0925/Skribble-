const express = require('express');
const cookieParser = require('cookie-parser');

const { startGame } = require('./controllers/startGame');
const { createGame } = require('./controllers/creategame');
const { endGame } = require('./controllers/endGame');

const { joinGame } = require('./controllers/joinGame');

const  {GameSocketService}  = require('./service/gameSocket.service');
// const errorHandler = require('./middlewares/error.middlewares');
const app = express();

app.use(cookieParser());
const http = require('http');
const httpServer = http.createServer(app);
// const healthCheckRoutes = require('./routes/v1/healthCheck.routes');
// const authRoutes = require('./routes/v1/auth.routes');
const io = GameSocketService(httpServer);

// app.use('/api/v1/healthcheck', healthCheckRoutes);
// app.use('/', authRoutes);
io.on('connection', (socket) => {
  console.log('user connected');
  // joinGame(socket);
  socket.on("Create_Game",createGame)
  // startGame(socket);
});
// app.use(errorHandler);
module.exports = { httpServer, app };
