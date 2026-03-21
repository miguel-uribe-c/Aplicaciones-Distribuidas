const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ejercicio 2: Calculadora de Operaciones Básicas
// POST /calcular
app.post('/calcular', (req, res) => {
  try {
    const { a, b, operacion } = req.body;

    // Validaciones
    if (a === undefined || b === undefined) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'Los campos "a" y "b" son requeridos.'
      });
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'Los campos "a" y "b" deben ser números.'
      });
    }

    const operacionesValidas = ['suma', 'resta', 'multiplicacion', 'division'];
    if (!operacion || !operacionesValidas.includes(operacion)) {
      return res.status(400).json({
        estado: 'error',
        mensaje: `El campo "operacion" debe ser uno de: ${operacionesValidas.join(', ')}.`
      });
    }

    let resultado;

    switch (operacion) {
      case 'suma':
        resultado = a + b;
        break;
      case 'resta':
        resultado = a - b;
        break;
      case 'multiplicacion':
        resultado = a * b;
        break;
      case 'division':
        if (b === 0) {
          return res.status(400).json({
            estado: 'error',
            mensaje: 'No se puede dividir entre cero.'
          });
        }
        resultado = a / b;
        break;
    }

    return res.status(200).json({
      estado: 'ok',
      resultado
    });
  } catch (error) {
    return res.status(500).json({
      estado: 'error',
      mensaje: 'Error interno del servidor.'
    });
  }
});
app.listen(PORT, () =>{
  console.log(`Servidor escuchando en http://localhost:${PORT} OJO solo se pueden ser los datos recibidos con: 
    "a":numero,"b":numero, "operacion":"operacion"
    operacionesValidas = ['suma', 'resta', 'multiplicacion', 'division']
    nota: los numeros no necesitan comillas en JSON las comillas son para especificar caracteres`);
});