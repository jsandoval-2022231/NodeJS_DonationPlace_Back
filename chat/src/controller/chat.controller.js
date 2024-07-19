import Chat from '../model/chat.model.js';

export const handleChatConnection = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('chatMessage', async (msg) => {
      const chatMessage = new Chat({
        user: msg.user,
        message: msg.message
      });
      await chatMessage.save();
      io.emit('chatMessage', msg);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

export const postChatMessage = async (req, res) => {
    try {
        const senderId = req.user;
        const {receiverId, message } = req.body;
        const chatMessage = new Chat({
          senderId: senderId.uid,
          receiverId,
          message
        });
        const savedMessage = await chatMessage.save();

        req.io.emit('chatMessage', { senderId, receiverId, message });

        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

export const getChatMessages = async (req, res) => {
    try {
        const messages = await Chat.find({
          $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId }
          ]
        }).sort({ timestamp: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};