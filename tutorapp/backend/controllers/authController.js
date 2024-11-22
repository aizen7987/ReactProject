const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Controlador para iniciar sesión
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({
        userId: user.id, // Asegúrate de incluir el ID del usuario
        role: user.role,
      });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

module.exports = {
  login,
};