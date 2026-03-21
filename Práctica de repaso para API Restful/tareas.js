const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Almacenamiento en memoria
let tareas = [];
let contadorId = 1;

// Ejercicio 3: Gestor de Tareas (CRUD Básico)

// POST /tareas - Crear tarea
app.post('/tareas', (req, res) => {
  try {
    const { titulo, completada } = req.body;

    if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "titulo" es requerido y debe ser un texto válido.'
      });
    }

    const nuevaTarea = {
      id: contadorId++,
      titulo: titulo.trim(),
      completada: typeof completada === 'boolean' ? completada : false
    };

    tareas.push(nuevaTarea);

    return res.status(201).json({
      estado: 'ok',
      tarea: nuevaTarea
    });
  } catch (error) {
    return res.status(500).json({
      estado: 'error',
      mensaje: 'Error interno del servidor.'
    });
  }
});

// GET /tareas - Listar todas las tareas
app.get('/tareas', (req, res) => {
  try {
    return res.status(200).json({
      estado: 'ok',
      total: tareas.length,
      tareas
    });
  } catch (error) {
    return res.status(500).json({
      estado: 'error',
      mensaje: 'Error interno del servidor.'
    });
  }
});

// PUT /tareas/:id - Actualizar una tarea
app.put('/tareas/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El ID proporcionado no es válido.'
      });
    }

    const indice = tareas.findIndex(t => t.id === id);

    if (indice === -1) {
      return res.status(404).json({
        estado: 'error',
        mensaje: `No se encontró una tarea con ID ${id}.`
      });
    }

    const { titulo, completada } = req.body;

    if (titulo !== undefined) {
      if (typeof titulo !== 'string' || titulo.trim() === '') {
        return res.status(400).json({
          estado: 'error',
          mensaje: 'El campo "titulo" debe ser un texto válido.'
        });
      }
      tareas[indice].titulo = titulo.trim();
    }

    if (completada !== undefined) {
      if (typeof completada !== 'boolean') {
        return res.status(400).json({
          estado: 'error',
          mensaje: 'El campo "completada" debe ser un booleano.'
        });
      }
      tareas[indice].completada = completada;
    }

    return res.status(200).json({
      estado: 'ok',
      tarea: tareas[indice]
    });
  } catch (error) {
    return res.status(500).json({
      estado: 'error',
      mensaje: 'Error interno del servidor.'
    });
  }
});

// DELETE /tareas/:id - Eliminar una tarea
app.delete('/tareas/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El ID proporcionado no es válido.'
      });
    }

    const indice = tareas.findIndex(t => t.id === id);

    if (indice === -1) {
      return res.status(404).json({
        estado: 'error',
        mensaje: `No se encontró una tarea con ID ${id}.`
      });
    }

    const tareaEliminada = tareas.splice(indice, 1)[0];

    return res.status(200).json({
      estado: 'ok',
      mensaje: `Tarea "${tareaEliminada.titulo}" eliminada correctamente.`,
      tarea: tareaEliminada
    });
  } catch (error) {
    return res.status(500).json({
      estado: 'error',
      mensaje: 'Error interno del servidor.'
    });
  }
});

app.listen(PORT, () =>{
  console.log(`Servidor escuchando en http://localhost:${PORT} OJO implementacion de post get put delete: 
    POST: titulo, completada
    GET: NO NECESITA PARAMETRO
    PUT: id
    DELETE: id
Nota: los numeros no necesitan comillas en JSON las comillas son para especificar caracteres`);
});
