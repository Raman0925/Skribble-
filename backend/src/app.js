const express = require('express');
const cookieParser = require('cookie-parser');

const { startGame } = require('./controllers/startGame');
const { createGame } = require('./controllers/creategame');
const { endGame } = require('./controllers/endGame');
const { joinGame } = require('./controllers/joinGame');
const { guessWord } = require('./controllers/guessWord');
const { startDrawing } = require('./controllers/startDrawing');
const { nextRound } = require('./controllers/nextRound');
const { drawingData } = require('./controllers/drawingData');

const { GameSocketService } = require('./service/gameSocket.service');
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
  socket.on('Create_Game', createGame);
  joinGame();

  startGame(socket);
  endGame(socket);
  guessWord(socket);
  startDrawing(socket);
  nextRound(socket);
  drawingData(socket);
});
// app.use(errorHandler);
module.exports = { httpServer, app };
