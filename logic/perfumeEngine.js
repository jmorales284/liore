// Mapeos de respuestas a pesos por familia olfativa
const personalityWeights = {
    aventurero: { amaderado:2, cítrico:1, especiado:2, marino:2, verde:1 },
    romantico: { floral:3, dulce:2, almizclado:1, frutal:1 },
    elegante: { floral:2, amaderado:1, almizclado:2, cítrico:1 },
    natural: { verde:3, fresco:2, cítrico:1, amaderado:1 },
    misterioso: { oriental:2, especiado:2, amaderado:1, resinoso:2 },
    alegre: { frutal:3, cítrico:2, floral:1, gourmand:1 },
    sofisticado: { oriental:2, amaderado:2, floral:1, almizclado:1 }
};

const seasonWeights = {
    primavera: { floral:3, verde:2, cítrico:1, frutal:1 },
    verano: { cítrico:3, frutal:2, fresco:2, marino:2 },
    otoño: { amaderado:2, especiado:2, oriental:2, gourmand:1 },
    invierno: { oriental:3, amaderado:2, gourmand:2, especiado:1 }
};

const occasionWeights = {
    diario: { cítrico:2, fresco:2, floral:1, verde:1 },
    cita: { floral:2, almizclado:2, dulce:2, oriental:1 },
    fiesta: { oriental:3, gourmand:2, especiado:2, amaderado:1 },
    especial: { floral:2, amaderado:2, almizclado:2, oriental:2 },
    regalo: { frutal:2, floral:2, gourmand:2, almizclado:1 }
};

// Nombres poéticos según personalidad + paisaje/estación
const adjectiveMap = {
    aventurero: 'Audaz',
    romantico: 'Apasionado',
    elegante: 'Distinguido',
    natural: 'Puro',
    misterioso: 'Enigmático',
    alegre: 'Vibrante',
    sofisticado: 'Refinado'
};

const nounMap = {
    primavera: 'Jardín Secreto',
    verano: 'Brisa Marina',
    otoño: 'Bosque Dorado',
    invierno: 'Noche de Invierno',
    // por si el usuario elige paisaje (se puede mapear en el front)
    bosque: 'Bosque Encantado',
    playa: 'Playa Serena',
    montaña: 'Cumbre Blanca',
    ciudad: 'Luces de Ciudad'
};

function getIntensityMultiplier(intensity) {
    // Ajusta la distribución de las capas según la intensidad deseada
    const map = {
        suave: { top: 0.20, heart: 0.45, base: 0.35 },
        moderada: { top: 0.25, heart: 0.40, base: 0.35 },
        intensa: { top: 0.20, heart: 0.35, base: 0.45 }
    };
    return map[intensity] || map.moderada;
}

function generatePerfume(answers, aromas) {
    // 1. Calcular puntuación para cada aroma
    const scores = {};
    aromas.forEach(aroma => {
        let score = 0;
        const families = aroma.families;

        // Personalidad
        const persWeight = personalityWeights[answers.personality] || {};
        families.forEach(f => { score += (persWeight[f] || 0); });

        // Estación
        const seasonWeight = seasonWeights[answers.season] || {};
        families.forEach(f => { score += (seasonWeight[f] || 0); });

        // Preferencias directas de familias (valoradas 1-5)
        if (answers.families) {
            for (const [family, rating] of Object.entries(answers.families)) {
                const normalized = (rating - 3) * 1.5;  // -3..+3
                if (families.includes(family)) {
                    score += normalized;
                }
            }
        }

        // Ocasión
        const occWeight = occasionWeights[answers.occasion] || {};
        families.forEach(f => { score += (occWeight[f] || 0); });

        // Notas que no soporta (excluir totalmente)
        if (answers.dislikes && Array.isArray(answers.dislikes) && answers.dislikes.includes(aroma.name)) {
            score = -1000;
        }

        scores[aroma.name] = score;
    });

    // 2. Separar por capas y ordenar por puntuación descendente
    const layers = { top: [], heart: [], base: [] };
    aromas.forEach(aroma => {
        if (scores[aroma.name] > -500) { // filtro de aversión
            layers[aroma.layer].push({ ...aroma, score: scores[aroma.name] });
        }
    });

    for (const layer in layers) {
        layers[layer].sort((a, b) => b.score - a.score);
    }

    // 3. Seleccionar las mejores notas de cada capa
    const maxNotes = { top: 3, heart: 4, base: 3 };
    const selected = { top: [], heart: [], base: [] };
    for (const layer in maxNotes) {
        const n = Math.min(maxNotes[layer], layers[layer].length);
        selected[layer] = layers[layer].slice(0, n);
        // Si no hay suficientes, tomamos todas las disponibles
    }

    // 4. Calcular proporciones dentro de cada capa
    const intensityTarget = getIntensityMultiplier(answers.intensity || 'moderada');

    const formulaNotes = {};
    for (const layer in selected) {
        const notes = selected[layer];
        if (notes.length === 0) continue;

        // Suma de puntuaciones positivas (shift para evitar ceros)
        const minScore = Math.min(...notes.map(n => n.score));
        const shift = Math.abs(minScore) + 1;
        const adjustedScores = notes.map(n => n.score + shift);
        const totalAdj = adjustedScores.reduce((s, v) => s + v, 0);

        const layerTotal = intensityTarget[layer] * 100;
        formulaNotes[layer] = notes.map((note, idx) => ({
            name: note.name,
            percentage: parseFloat(((adjustedScores[idx] / totalAdj) * layerTotal).toFixed(1))
        }));
    }

    // 5. Generar nombre
    const adj = adjectiveMap[answers.personality] || 'Único';
    const noun = nounMap[answers.season] || 'Esencia';
    const perfumeName = `${adj} ${noun}`;

    // 6. Descripción
    const topNames = formulaNotes.top ? formulaNotes.top.map(n => n.name).join(', ') : 'notas frescas';
    const heartNames = formulaNotes.heart ? formulaNotes.heart.map(n => n.name).join(', ') : 'florales';
    const baseNames = formulaNotes.base ? formulaNotes.base.map(n => n.name).join(', ') : 'cálidas';
    const desc = `Un perfume ${answers.intensity || 'moderado'} que abre con ${topNames}, despliega un corazón de ${heartNames} y reposa sobre una base de ${baseNames}. Creado para una personalidad ${answers.personality}, perfecto para la ocasión: ${answers.occasion}.`;

    return {
        name: perfumeName,
        description: desc,
        notes: formulaNotes
    };
}

module.exports = { generatePerfume };