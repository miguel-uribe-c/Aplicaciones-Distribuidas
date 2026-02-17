const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

/* =========================
   ENDPOINT: /mascaracteres
   Recibe:
   {
     "cadena1": "texto",
     "cadena2": "texto"
   }
========================= */
app.post("/mascaracteres", (req, res) => {
    const { cadena1, cadena2 } = req.body;

    // Validación de parámetros
    if (cadena1 === undefined || cadena2 === undefined) {
        return res.status(400).json({
            success: false,
            error: "Se requieren los parámetros cadena1 y cadena2"
        });
    }

    if (typeof cadena1 !== "string" || typeof cadena2 !== "string") {
        return res.status(400).json({
            success: false,
            error: "Ambos parámetros deben ser cadenas de texto"
        });
    }

    // Lógica del servicio
    let resultado;
    if (cadena1.length >= cadena2.length) {
        resultado = cadena1;
    } else {
        resultado = cadena2;
    }

    // Respuesta
    res.json({
        success: true,
        resultado: resultado
    });
});

app.post("/menoscaracteres", (req, res) => {
    const { cadena1, cadena2 } = req.body;

    // Validación de parámetros
    if (cadena1 === undefined || cadena2 === undefined) {
        return res.status(400).json({
            success: false,
            error: "Se requieren los parámetros cadena1 y cadena2"
        });
    }

    if (typeof cadena1 !== "string" || typeof cadena2 !== "string") {
        return res.status(400).json({
            success: false,
            error: "Ambos parámetros deben ser cadenas de texto"
        });
    }

    // Lógica del servicio
    let resultado;
    if (cadena1.length >= cadena2.length) {
        resultado = cadena2;
    } else {
        resultado = cadena1;
    }

    // Respuesta
    res.json({
        success: true,
        resultado: resultado
    });
});

app.post("/numcaracteres", (req, res) => {
    const { cadena1, cadena2 } = req.body;

    // Validación de parámetros
    if (cadena1 === undefined || cadena2 === undefined) {
        return res.status(400).json({
            success: false,
            error: "Se requieren los parámetros cadena1 y cadena2"
        });
    }

    if (typeof cadena1 !== "string" || typeof cadena2 !== "string") {
        return res.status(400).json({
            success: false,
            error: "Ambos parámetros deben ser cadenas de texto"
        });
    }

    // Lógica del servicio
    let resultado;
    if (cadena1.length >= cadena2.length) {
        resultado = cadena1.length;
    } else {
        resultado = cadena2.length;
    }

    // Respuesta
    res.json({
        success: true,
        resultado: resultado
    });
});
/* =========================
   iv. palindroma
========================= */
app.post("/palindroma", (req, res) => {
    const { cadena } = req.body;

    if (typeof cadena !== "string") {
        return res.status(400).json({
            success: false,
            error: "Se requiere cadena como texto"
        });
    }

    const limpia = cadena.toLowerCase().replace(/\s+/g, "");
    const invertida = limpia.split("").reverse().join("");
    const resultado = limpia === invertida;

    res.json({
        success: true,
        resultado: resultado
    });
});

/* =========================
   v. concat
========================= */
app.post("/concat", (req, res) => {
    const { cadena1, cadena2 } = req.body;

    if (typeof cadena1 !== "string" || typeof cadena2 !== "string") {
        return res.status(400).json({
            success: false,
            error: "Se requieren cadena1 y cadena2 como texto"
        });
    }

    res.json({
        success: true,
        resultado: cadena1 + cadena2
    });
});

/* =========================
   vi. applysha256
========================= */
app.post("/applysha256", (req, res) => {
    const { cadena } = req.body;

    if (typeof cadena !== "string") {
        return res.status(400).json({
            success: false,
            error: "Se requiere cadena como texto"
        });
    }

    const hash = crypto
        .createHash("sha256")
        .update(cadena)
        .digest("hex");

    res.json({
        success: true,
        original: cadena,
        encriptada: hash
    });
});

/* =========================
   vii. verifysha256
========================= */
app.post("/verifysha256", (req, res) => {
    const { cadena, encriptada } = req.body;

    if (typeof cadena !== "string" || typeof encriptada !== "string") {
        return res.status(400).json({
            success: false,
            error: "Se requieren cadena y encriptada como texto"
        });
    }

    const hash = crypto
        .createHash("sha256")
        .update(cadena)
        .digest("hex");

    const resultado = hash === encriptada;

    res.json({
        success: true,
        resultado: resultado
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
