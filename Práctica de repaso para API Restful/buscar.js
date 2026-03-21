const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Ejercicio 6: Buscador en Array
// POST /buscar
app.post('/buscar', (req, res) => {
  try {
    const { array, elemento } = req.body;

    if (!Array.isArray(array)) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "array" es requerido y debe ser un arreglo.'
      });
    }

    if (elemento === undefined) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "elemento" es requerido.'
      });
    }

    const indice = array.findIndex(item => {
      // Comparación profunda para objetos
      if (typeof item === 'object' && typeof elemento === 'object' && item !== null && elemento !== null) {
        return JSON.stringify(item) === JSON.stringify(elemento);
      }
      return item === elemento;
    });

    const encontrado = indice !== -1;
    const tipoElemento = Array.isArray(elemento) ? 'array' : typeof elemento;

    return res.status(200).json({
      estado: 'ok',
      encontrado,
      indice: encontrado ? indice : -1,
      tipoElemento
    });
  } catch (error) {
    return res.status(500).json({
      estado: 'error',
      mensaje: 'Error interno del servidor.'
    });
  }
});
app.listen(PORT, () =>{
  console.log(`Servidor escuchando en http://localhost:${PORT}/buscar OJO implementacion de POST: 
   array, elemento
   ejemplo de uso array (arreglo):
   {
  "array": ["hola", "miguel", "node"],
  "elemento": "miguel"
    }
  {
  "array": [1, 2, 3, 4, 5],
  "elemento": 3
}
Nota: los numeros no necesitan comillas en JSON las comillas son para especificar caracteres`);
});


