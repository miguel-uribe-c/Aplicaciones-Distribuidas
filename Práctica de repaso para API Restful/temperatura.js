const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Ejercicio 5: Conversor de Temperatura
// POST /convertir-temperatura

function convertir(valor, desde, hacia) {
  // Primero convertir a Celsius como base
  let enCelsius;

  switch (desde) {
    case 'C':
      enCelsius = valor;
      break;
    case 'F':
      enCelsius = (valor - 32) * (5 / 9);
      break;
    case 'K':
      enCelsius = valor - 273.15;
      break;
  }

  // Luego convertir de Celsius al destino
  switch (hacia) {
    case 'C':
      return enCelsius;
    case 'F':
      return enCelsius * (9 / 5) + 32;
    case 'K':
      return enCelsius + 273.15;
  }
}

const nombresEscalas = {
  C: 'Celsius',
  F: 'Fahrenheit',
  K: 'Kelvin'
};

app.post('/convertir-temperatura', (req, res) => {
  try {
    const { valor, desde, hacia } = req.body;

    if (valor === undefined || desde === undefined || hacia === undefined) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'Los campos "valor", "desde" y "hacia" son requeridos.'
      });
    }

    if (typeof valor !== 'number' || isNaN(valor)) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "valor" debe ser un número.'
      });
    }

    const escalasValidas = ['C', 'F', 'K'];

    if (!escalasValidas.includes(desde)) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "desde" debe ser C, F o K.'
      });
    }

    if (!escalasValidas.includes(hacia)) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "hacia" debe ser C, F o K.'
      });
    }

    // Validar Kelvin no negativo
    if (desde === 'K' && valor < 0) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'Los valores en Kelvin no pueden ser negativos.'
      });
    }

    // Validar que en Fahrenheit no baje del cero absoluto
    if (desde === 'F' && valor < -459.67) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El valor en Fahrenheit está por debajo del cero absoluto (-459.67°F).'
      });
    }

    // Validar que en Celsius no baje del cero absoluto
    if (desde === 'C' && valor < -273.15) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El valor en Celsius está por debajo del cero absoluto (-273.15°C).'
      });
    }

    const valorConvertido = parseFloat(convertir(valor, desde, hacia).toFixed(4));

    return res.status(200).json({
      estado: 'ok',
      valorOriginal: valor,
      valorConvertido,
      escalaOriginal: nombresEscalas[desde],
      escalaConvertida: nombresEscalas[hacia]
    });
  } catch (error) {
    return res.status(500).json({
      estado: 'error',
      mensaje: 'Error interno del servidor.'
    });
  }
});

app.listen(PORT, () =>{
  console.log(`Servidor escuchando en http://localhost:${PORT}/convertir-temperatura OJO implementacion de POST: 
    valor, desde, hacia
    valores validos de conversion de temperatuta: "C, K, F"

   
Nota: los numeros no necesitan comillas en JSON las comillas son para especificar caracteres`);
});


