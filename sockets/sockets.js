

function initSockets(http) {
    const io = require('socket.io').listen(http);
    io.on('connection', socket => {
        socket.on('clientGameJoined', room => {
            socket.join(room)
            socket.to(room).emit('serverUserJoined');
        });
        
        
        socket.on('clientAlreadyHere', room => {
            socket.to(room).emit('serverSomeoneAlreadyHere')
        })
        
        openDicesSocket(socket)
        
        socket.on('clientSoldierMoved', (moveSoldierDto) => {
            io.sockets.in(moveSoldierDto.room)
            .emit('serverSoldierMoved', moveSoldierDto);
        });
        socket.on('clientSoldierMoveReceived', (moveReceivedDto) => {
            io.sockets.in(moveReceivedDto.room)
            .emit('serverSoldierMoveReceived', moveReceivedDto);
        });
        socket.on('clientEndTurn', room => {
            socket.to(room).emit('serverEndTurn');
        });
        socket.on('clientEndGame', (endGameDto) => {
            socket.to(endGameDto.room).emit('serverEndGame', endGameDto);
        });
        socket.on('clientEndGameDtoReceived', (endGameReceivedDto) => {
            socket.to(endGameReceivedDto.room).emit('serverEndGameDtoReceived', endGameReceivedDto);
        });
        socket.on('clientRestartGame', room => {
            socket.to(room).emit('serverRestartGame');
        });
        socket.on('chatJoined', room => socket.join(room));
        
        socket.on('assignMsg', ({ msg, room }) => {
            io.sockets.in(room).emit('renderMsg', msg);
        });
        
    });
}

function openDicesSocket(socket) {
    
    socket.on('clientThrowDices', (throwDicesDto) => {
        console.log(throwDicesDto)
        socket.to(throwDicesDto.room).emit('serverThrowDices',throwDicesDto);
    });

    socket.on('clientThrowDicesReceived', throwDicesReceivedDto => {
        socket.to(throwDicesReceivedDto.room).emit('serverThrowDiceReceived',throwDicesReceivedDto);
    });
}


module.exports = initSockets;