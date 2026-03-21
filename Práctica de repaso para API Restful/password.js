const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Ejercicio 4: Validador de Contraseñas
// POST /validar-password
app.post('/validar-password', (req, res) => {
  try {
    const { password } = req.body;

    if (password === undefined || password === null) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "password" es requerido.'
      });
    }

    if (typeof password !== 'string') {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "password" debe ser un texto.'
      });
    }

    const errores = [];

    if (password.length < 8) {
      errores.push('La contraseña debe tener al menos 8 caracteres.');
    }
    if (!/[A-Z]/.test(password)) {
      errores.push('La contraseña debe contener al menos una letra mayúscula.');
    }
    if (!/[a-z]/.test(password)) {
      errores.push('La contraseña debe contener al menos una letra minúscula.');
    }
    if (!/[0-9]/.test(password)) {
      errores.push('La contraseña debe contener al menos un número.');
    }

    return res.status(200).json({
      estado: 'ok',
      esValida: errores.length === 0,
      errores
    });
  } catch (error) {
    return res.status(500).json({
      estado: 'error',
      mensaje: 'Error interno del servidor.'
    });
  }
});
app.listen(PORT, () =>{
  console.log(`Servidor escuchando en http://localhost:${PORT}/validar-password OJO implementacion de POSTs: 
    POST: password

   
Nota: los numeros no necesitan comillas en JSON las comillas son para especificar caracteres`);
});

