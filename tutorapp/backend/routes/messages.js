// backend/routes/messages.js
const express = require('express');
const router = express.Router();
const { getMessages } = require('../controllers/messageController'); // Importar el controlador

// Ruta para obtener mensajes entre dos usuarios
router.get('/:userId/:otherUserId', getMessages);

module.exports = router;