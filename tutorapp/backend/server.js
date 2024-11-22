// backend/server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const tutorRoutes = require('./routes/tutors');
const studentsRoutes = require('./routes/students'); // Asegúrate de que esta línea esté presente
const messageRoutes = require('./routes/messages'); 
const User = require('./models/user');
const Message = require('./models/message');
const { handleMessage } = require('./controllers/messageController'); // Importar el controlador correctamente

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// Definir relaciones
Message.belongsTo(User, { as: 'Sender', foreignKey: 'sender_id' });
Message.belongsTo(User, { as: 'Receiver', foreignKey: 'receiver_id' });

app.use('/api/auth', authRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/students', studentsRoutes); // Asegúrate de que esta línea esté presente
app.use('/api/messages', messageRoutes);

// Usar el controlador de mensajes
handleMessage(io); // Asegúrate de que esto esté correcto

sequelize.sync().then(() => {
  server.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
  });
}).catch(err => console.log(err));