"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const http = require("http").Server(app);
const io = require("socket.io").listen(http);
const userRoute = require("./routes/user.route");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "puki muki",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use(express.static("public"));
userRoute(app);

io.on("connection", socket => {
  socket.on("clientGameJoined", room => {
    socket.join(room)    
    socket.broadcast.to(room).emit('serverUserJoined');
  });
  
  
  socket.on('clientAlreadyHere', room => {
    socket.broadcast.to(room).emit('serverSomeoneAlreadyHere')
  })
  socket.on("clientRollDices", room => {
    socket.broadcast.to(room).emit('serverDicesRolling');
  });

  socket.on("clientDicesRes", (room,dices) => {
    socket.broadcast.to(room).emit('serverDicesUnrolling',dices);
  });
  socket.on("clientStartDiceRes", (room,dice) => {
    socket.broadcast.to(room).emit('serverDiceUnrolling',dice);
  });
  socket.on("clientSoldierMoved", ({soldierId, targetCell, cells, isEating, room}) => {
    io.sockets.in(room)
      .emit("serverSoldierMoved",{soldierId, targetCell, cells, isEating});
  });
  socket.on("clientEndTurn", room => {
    socket.broadcast.to(room).emit('serverEndTurn');
  });
  socket.on("clientEndGame", (room,winner) => {
    socket.broadcast.to(room).emit('serverGameEnded',winner);
  });
  socket.on("clientMars", room => {
    socket.broadcast.to(room).emit('serverIsMars');
  });
  socket.on("clientTurkishMars", room => {
    socket.broadcast.to(room).emit('serverIsTurkishMars');
  });
  socket.on("clientRestartGame", room => {
    socket.broadcast.to(room).emit('serverRestartGame');
  });

  socket.on("chatJoined", room => socket.join(room));
  
  socket.on("assignMsg", ({ msg, room }) => {
    io.sockets.in(room).emit("renderMsg", msg);
  });
  
});

http.listen(process.env.PORT || 3000, () => {
});

