// backend/controllers/messageController.js
const Message = require('../models/message');
const { Op } = require('sequelize'); // Asegúrate de importar Op si lo usas

// Controlador para manejar el envío de mensajes
const handleMessage = (io) => {
  io.on('connection', (socket) => {
    console.log('Usuario conectado', socket.id);

    socket.on('sendMessage', async (data) => {
      try {
        // Guardar el mensaje en la base de datos
        const newMessage = await Message.create(data);
        // Emitir el mensaje a los usuarios correspondientes
        io.to(data.receiver_id).emit('receiveMessage', newMessage); // Emitir el mensaje guardado
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
  });
};

// Controlador para obtener mensajes entre dos usuarios
const getMessages = async (req, res) => {
  const { userId, otherUserId } = req.params; // Obtener IDs de los usuarios

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: userId, receiver_id: otherUserId },
          { sender_id: otherUserId, receiver_id: userId }
        ]
      },
      order: [['createdAt', 'ASC']], // Ordenar mensajes por fecha
    });
    res.json(messages);
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
};

// Exportar los controladores
module.exports = {
  handleMessage,
  getMessages,
};