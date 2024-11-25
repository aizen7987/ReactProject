// backend/controllers/messageController.js
const Message = require('../models/message');
const { Op } = require('sequelize'); // Asegúrate de importar Op si lo usas

// Almacena los sockets de los usuarios
const userSockets = {};

const handleMessage = (io) => {
  io.on('connection', (socket) => {
    console.log('Usuario conectado', socket.id);

    // Almacena el ID del usuario en el socket
    socket.on('registerUser', (userId) => {
      userSockets[userId] = socket.id; // Almacena el ID del socket asociado al ID del usuario
      console.log(`Usuario registrado: ${userId} con socket ID: ${socket.id}`);
    });

    socket.on('sendMessage', async (data) => {
      try {
        // Guardar el mensaje en la base de datos
        const newMessage = await Message.create(data);
        
        // Asegúrate de que el nuevo mensaje tenga las fechas
        const messageToSend = {
          id: newMessage.id, // ID del nuevo mensaje
          sender_id: newMessage.sender_id,
          receiver_id: newMessage.receiver_id,
          message: newMessage.message,
          createdAt: newMessage.createdAt, // Fecha de creación
          updatedAt: newMessage.updatedAt  // Fecha de actualización
        };
    
        console.log('Mensaje guardado en la base de datos:', messageToSend);
        
        // Emitir el mensaje a los usuarios correspondientes usando los IDs de socket
        const receiverSocketId = userSockets[data.receiver_id];
        const senderSocketId = userSockets[data.sender_id];
        
        console.log("id_receiver:" + userSockets[data.receiver_id]);

        if (receiverSocketId) {
          io.to(receiverSocketId).emit('receiveMessage', messageToSend); // Emitir el mensaje al receptor
        }
        if (senderSocketId) {
          io.to(senderSocketId).emit('receiveMessage', messageToSend); // Emitir el mensaje al remitente
        }
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
      // Eliminar el socket del objeto cuando el usuario se desconecta
      for (const userId in userSockets) {
        if (userSockets[userId] === socket.id) {
          delete userSockets[userId];
          console.log(`Usuario desconectado: ${userId}`);
          break;
        }
      }
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