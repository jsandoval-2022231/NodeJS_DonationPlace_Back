import { Server } from 'socket.io';

const configureSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "https://dua-fronted.vercel.app", 
            methods: ["GET", "POST"]
        }
    });

    return io;
};

export default configureSocket;
