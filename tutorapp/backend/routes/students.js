// backend/routes/students.js
const express = require('express');
const router = express.Router();
const { getStudents } = require('../controllers/studentController'); // Importar el controlador

// Ruta para obtener estudiantes
router.get('/', getStudents);

module.exports = router;