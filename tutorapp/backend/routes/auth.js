const express = require('express');
   const bcrypt = require('bcryptjs');
   const jwt = require('jsonwebtoken');
   const User = require('../models/user');
   const router = express.Router();

   router.post('/register', async (req, res) => {
     const { username, password, role } = req.body;
     //const hashedPassword = await bcrypt.hash(password, 10);
     const user = await User.create({ username, password: password, role });
     res.json(user);
   });

   router.post('/login', async (req, res) => {
     const { username, password } = req.body;
     const user = await User.findOne({ where: { username } });
     if (user && await bcrypt.compare(password, user.password)) {
       const token = jwt.sign({ id: user.id, role: user.role }, 'secret');
       res.json({ token });
     } else {
       res.status(401).json({ error: 'Credenciales incorrectas' });
     }
   });

   module.exports = router;