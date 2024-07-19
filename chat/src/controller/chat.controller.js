import Chat from '../model/chat.model.js';

export const handleChatConnection = (io) => {
  io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('chatMessage', async (msg) => {
          try {
              const chatMessage = new Chat({
                  user: msg.user,
                  message: msg.message
              });
              await chatMessage.save();
              io.emit('chatMessage', msg);
          } catch (error) {
              console.error('Error saving chat message:', error);
          }
      });

      socket.on('disconnect', () => {
          console.log('Client disconnected');
      });
  });
};

export const postChatMessage = async (req, res) => {
  try {
      const senderId = req.user.uid;
      const { receiverId, message } = req.body;

      let chat = await Chat.findOne({
          users: { $all: [senderId, receiverId] }
      });

      if (!chat) {
          chat = new Chat({
              users: [senderId, receiverId],
              messages: []
          });
      }

      chat.messages.push({ senderId, message });
      const savedChat = await chat.save();

      req.io.emit('chatMessage', { senderId, receiverId, message });

      res.status(201).json(savedChat);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

export const getChatMessages = async (req, res) => {
  try {
      const senderId = req.user.uid;
      const receiverId = req.params.receiverId;

      const chat = await Chat.findOne({
          users: { $all: [senderId, receiverId] }
      }).sort({ 'messages.timestamp': -1 });

      if (!chat) {
          return res.status(404).json({ message: 'Chat not found' });
      }

      res.json(chat.messages);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};