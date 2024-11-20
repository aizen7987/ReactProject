const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const User = require('./models/user');
const Message = require('./models/message');

const app = express();
app.use(cors());
app.use(express.json());

// Definir relaciones
Message.belongsTo(User, { as: 'Sender', foreignKey: 'sender_id' });
Message.belongsTo(User, { as: 'Receiver', foreignKey: 'receiver_id' });

app.use('/api/auth', authRoutes);

sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
  });
}).catch(err => console.log(err));