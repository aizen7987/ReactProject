// backend/routes/tutors.js
const express = require('express');
const router = express.Router();
const { getTutors } = require('../controllers/tutorController'); // Importar el controlador

// Ruta para obtener tutores
router.get('/', getTutors);

module.exports = router;