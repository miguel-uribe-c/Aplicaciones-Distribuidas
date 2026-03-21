const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ejercicio 7: Contador de Palabras
// POST /contar-palabras
app.post('/contar-palabras', (req, res) => {
  try {
    const { texto } = req.body;

    if (texto === undefined || texto === null) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "texto" es requerido.'
      });
    }

    if (typeof texto !== 'string') {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "texto" debe ser un texto (string).'
      });
    }

    if (texto.trim() === '') {
      return res.status(200).json({
        estado: 'ok',
        totalPalabras: 0,
        totalCaracteres: 0,
        palabrasUnicas: 0
      });
    }

    // Separar palabras ignorando espacios extra
    const palabras = texto.trim().split(/\s+/);
    const totalPalabras = palabras.length;
    const totalCaracteres = texto.length;

    // Palabras únicas (case insensitive)
    const palabrasUnicas = new Set(palabras.map(p => p.toLowerCase())).size;

    return res.status(200).json({
      estado: 'ok',
      totalPalabras,
      totalCaracteres,
      palabrasUnicas
    });
  } catch (error) {
    return res.status(500).json({
      estado: 'error',
      mensaje: 'Error interno del servidor.'
    });
  }
});
app.listen(PORT, () =>{
  console.log(`Servidor escuchando en http://localhost:${PORT}/contar-palabras OJO implementacion de POST: 
   texto
Nota: los numeros no necesitan comillas en JSON las comillas son para especificar caracteres`);
});


