import { Server } from 'socket.io';

const configureSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", 
            methods: ["GET", "POST"]
        }
    });

    return io;
};

export default configureSocket;
