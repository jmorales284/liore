const express = require('express');
const path = require('path');
const { generatePerfume } = require('./logic/perfumeEngine');
const aromas = require('./data/aromas.json');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/create-perfume', (req, res) => {
    try {
        const answers = req.body;
        if (!answers || Object.keys(answers).length === 0) {
            return res.status(400).json({ error: 'No se recibieron respuestas' });
        }
        const formula = generatePerfume(answers, aromas);
        res.json(formula);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al generar el perfume' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});