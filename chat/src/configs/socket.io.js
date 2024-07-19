import { Server } from 'socket.io';

const configureSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "https://proyecto6to-ee92f.web.app", 
            methods: ["GET", "POST"]
        }
    });

    return io;
};

export default configureSocket;
