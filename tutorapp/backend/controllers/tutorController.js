// backend/controllers/tutorController.js
const User = require('../models/user'); // Asegúrate de que este modelo esté configurado correctamente

// Controlador para obtener tutores
const getTutors = async (req, res) => {
  try {
    const tutors = await User.findAll({ where: { role: 'tutor' } }); // Filtrar por rol de tutor
    res.json(tutors);
  } catch (error) {
    console.error('Error al obtener tutores:', error);
    res.status(500).json({ error: 'Error al obtener tutores' });
  }
};

// Exportar el controlador
module.exports = {
  getTutors,
};