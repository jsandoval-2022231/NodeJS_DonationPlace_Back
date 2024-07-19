// const handleChatConnection = (io) => {
//     io.on('connection', (socket) => {
//       console.log('New client connected');
  
//       socket.on('chatMessage', (msg) => {
//         io.emit('chatMessage', msg);
//       });
  
//       socket.on('disconnect', () => {
//         console.log('Client disconnected');
//       });
//     });
//   };
  
//   export default handleChatConnection;
  