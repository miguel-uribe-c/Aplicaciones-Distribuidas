const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/saludo', (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "nombre" es requerido y debe ser un texto válido.'
      });
    }

    return res.status(200).json({
      estado: 'ok',
      mensaje: `Hola, ${nombre.trim()}`
    });
  } catch (error) {
    return res.status(500).json({
      estado: 'error',
      mensaje: 'Error interno del servidor.'
    });
  }
});

app.listen(PORT, () =>{
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});