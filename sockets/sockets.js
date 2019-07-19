

function initSockets(http) {
    const io = require('socket.io').listen(http);
    io.on('connection', socket => {
        socket.on('clientGameJoined', room => {
            socket.join(room)
            socket.broadcast.to(room).emit('serverUserJoined');
        });
        
        
        socket.on('clientAlreadyHere', room => {
            socket.broadcast.to(room).emit('serverSomeoneAlreadyHere')
        })
        socket.on('clientRollDices', room => {
            socket.broadcast.to(room).emit('serverDicesRolling');
        });
        
        socket.on('clientDicesRes', (room, dices) => {
            socket.broadcast.to(room).emit('serverDicesUnrolling', dices);
        });
        socket.on('clientStartDiceRes', (room, dice) => {
            socket.broadcast.to(room).emit('serverDiceUnrolling', dice);
        });
        socket.on('clientSoldierMoved', (moveSoldierDto) => {
            io.sockets.in(moveSoldierDto.room)
            .emit('serverSoldierMoved', moveSoldierDto);
        });
        socket.on('clientEndTurn', room => {
            socket.broadcast.to(room).emit('serverEndTurn');
        });
        socket.on('clientEndGame', (endGameDto) => {
            socket.broadcast.to(endGameDto.room).emit('serverGameEnded', endGameDto);
        });
        socket.on('clientRestartGame', room => {
            socket.broadcast.to(room).emit('serverRestartGame');
        });
        
        socket.on('chatJoined', room => socket.join(room));
        
        socket.on('assignMsg', ({ msg, room }) => {
            io.sockets.in(room).emit('renderMsg', msg);
        });
        
    });
}

module.exports = initSockets;