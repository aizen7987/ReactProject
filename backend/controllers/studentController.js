// backend/controllers/studentController.js
const User = require('../models/user'); // Asegúrate de que este modelo esté configurado correctamente

// Controlador para obtener estudiantes
const getStudents = async (req, res) => {
  try {
    const students = await User.findAll({ where: { role: 'student' } }); // Filtrar por rol de estudiante
    res.json(students);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
};

// Exportar el controlador
module.exports = {
  getStudents,
};