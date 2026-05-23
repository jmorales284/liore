// Mapeo de categorías de personalidad/perfil a pesos por familia
const categoryWeights = {
    // MUJER
    romantica: { floral: 3, dulce: 2, romantico: 3, suave: 2 },
    social: { frutal: 2, cítrico: 2, alegre: 2, vibrante: 2 },
    introspectiva: { amaderado: 1, verde: 2, fresco: 2, suave: 3 },
    activa: { cítrico: 3, fresco: 3, frutal: 1, verde: 2 },
    intensa: { oriental: 3, especiado: 2, intenso: 3, amaderado: 1 },
    suave: { floral: 2, dulce: 2, suave: 3, cremoso: 2, almizclado: 1 },
    fresca: { cítrico: 3, fresco: 3, frutal: 2, verde: 2 },
    dulce: { gourmand: 3, dulce: 3, frutal: 1, cremoso: 1 },
    // HOMBRE
    activo: { cítrico: 2, fresco: 3, amaderado: 1, verde: 2 },
    tranquilo: { amaderado: 2, verde: 2, suave: 2, cremoso: 1 },
    aventurero: { amaderado: 2, especiado: 2, verde: 2, oriental: 1 },
    clasico: { amaderado: 3, fresco: 1, clásico: 3, seco: 1 },
    intenso: { oriental: 3, especiado: 3, amaderado: 1, intenso: 3 },
    sofisticado: { oriental: 2, amaderado: 2, especiado: 1, cremoso: 1 },
    fresco: { cítrico: 3, fresco: 3, acuático: 3, ligero: 2 },
    // Categorías de dulzura / intensidad
    muydulce: { gourmand: 3, dulce: 4 },
    nodulce: { gourmand: -3, dulce: -3, seco: 2, amaderado: 1 },
    moderado: {}, // neutro
    variable: {}, // no afecta directamente a familias, lo usaremos en lógica de capas
    // Preferencias directas de familias (pregunta 6 mujer/hombre)
    frutal: { frutal: 3 },
    floral: { floral: 3 },
    dulce: { dulce: 3 },
    citrico: { cítrico: 3 },
    amaderado: { amaderado: 3 },
    intenso: { oriental: 2, especiado: 2, intenso: 2 }
};

// Mapeo de respuestas de preguntas a categorías (según tu documento)
// Lo usaremos en el engine para interpretar las respuestas literales
const answerToCategory = {
    mujer: {
        pregunta1: {
            "Café, paseo y momentos tranquilos": "romantica",
            "Salir y estar con amigos": "social",
            "Casa, lectura y descanso": "introspectiva",
            "Naturaleza o deporte": "activa"
        },
        pregunta2: {
            "Soñadora y romántica": "romantica",
            "Apasionada e intensa": "intensa",
            "Tranquila y equilibrada": "suave",
            "Espontánea y alegre": "fresca"
        },
        pregunta3: {
            "Por mi calidez y ternura": "dulce",
            "Por mi elegancia y estilo": "intensa",
            "Por mi frescura y autenticidad": "fresca",
            "Por mi paz y sensibilidad": "suave"
        },
        pregunta4: {
            "Rojo o rosa": "intensa",
            "Blanco o beige": "suave",
            "Morado o azul": "romantica",
            "Verde o amarillo": "fresca"
        },
        pregunta5: {
            "Pop romántico o baladas": "romantica",
            "Reggaeton o electrónica": "social",
            "Indie o alternativa": "introspectiva",
            "Salsa o tropical": "activa"
        },
        pregunta6: {
            "Frutales y afrutados": "frutal",
            "Florales y delicados": "floral",
            "Dulces y cremosos": "dulce",
            "Cítricos y frescos": "citrico"
        },
        pregunta7: {
            "Me encantan, entre más dulce mejor": "muydulce",
            "Me gustan pero con equilibrio": "dulce",
            "Los tolero pero no son mis favoritos": "nodulce",
            "No me gustan nada": "nodulce"
        },
        pregunta8: {
            "Coco tropical": "tropical", // añadimos tropical si es necesario
            "Fresa y frutos rojos": "frutal",
            "Durazno y fruta suave": "suave",
            "Rosa y floral": "floral"
        },
        pregunta9: {
            "Muy suave, apenas perceptible": "suave",
            "Moderado y equilibrado": "moderado",
            "Intenso y hostigante": "intensa",
            "Variable según el momento": "variable"
        },
        pregunta10: {
            "Sí, prefiero siempre algo discreto": "suave",
            "No, me gustan los que se notan": "intensa",
            "Depende del aroma": "moderado",
            "Solo de noche me gustan intensos": "variable"
        }
    },
    hombre: {
        pregunta1: {
            "Deporte o actividad física": "activo",
            "Descansar en casa": "tranquilo",
            "Salir con amigos": "social",
            "Explorar algo nuevo": "aventurero"
        },
        pregunta2: {
            "Seguro y sereno": "clasico",
            "Intenso y directo": "intenso",
            "Libre y espontáneo": "fresco",
            "Enfocado y ambicioso": "sofisticado"
        },
        pregunta3: {
            "Por mi seguridad y presencia": "clasico",
            "Por mi frescura y autenticidad": "fresco",
            "Por mi intensidad y carácter": "intenso",
            "Por mi estilo y sofisticación": "sofisticado"
        },
        pregunta4: {
            "Negro o gris": "intenso",
            "Azul marino o verde oscuro": "clasico",
            "Blanco o beige": "fresco",
            "Café o terracota": "sofisticado"
        },
        pregunta5: {
            "Trap, rap o urbano": "intenso",
            "Rock o alternativa": "clasico",
            "Electrónica o reggaeton": "social",
            "Jazz, soul o lo-fi": "sofisticado"
        },
        pregunta6: {
            "Frescos y acuáticos": "fresco",
            "Amaderados y naturales": "amaderado",
            "Cítricos y energéticos": "citrico",
            "Intensos y misteriosos": "intenso"
        },
        pregunta7: {
            "No me gustan nada": "nodulce",
            "Los tolero solo como nota de fondo": "nodulce",
            "Me gustan con equilibrio": "dulce",
            "Me encantan": "muydulce"
        },
        pregunta8: {
            "Brisa marina y frescura": "fresco",
            "Pino o bosque": "verde",
            "Sándalo o madera": "amaderado",
            "Oriental o buena noche": "intenso"
        },
        pregunta9: {
            "Suave y discreto": "suave",
            "Moderado y equilibrado": "moderado",
            "Fuerte e impactante": "intenso",
            "Suave de día, intenso de noche": "variable"
        },
        pregunta10: {
            "Sí, prefiero siempre discreto": "suave",
            "No, me gustan los que se notan": "intenso",
            "Depende del aroma": "moderado",
            "Solo de noche intensos": "variable"
        }
    }
};

function generatePerfume(answers, aromas) {
    // answers esperado: { gender: "mujer"|"hombre", q1: "respuesta", q2: ..., q10: "respuesta" }
    const gender = answers.gender;
    const mapping = answerToCategory[gender];
    if (!mapping) throw new Error('Género no válido');

    // 1. Obtener lista de categorías resultantes de cada pregunta
    const categories = [];
    for (let i = 1; i <= 10; i++) {
        const questionKey = `pregunta${i}`;
        const answerText = answers[`q${i}`];
        if (answerText && mapping[questionKey] && mapping[questionKey][answerText]) {
            categories.push(mapping[questionKey][answerText]);
        }
    }

    // 2. Calcular peso acumulado por familia a partir de las categorías
    const familyScores = {};
    categories.forEach(cat => {
        const weights = categoryWeights[cat] || {};
        for (const [family, weight] of Object.entries(weights)) {
            familyScores[family] = (familyScores[family] || 0) + weight;
        }
    });

    // 3. Calcular puntuación final para cada aroma
    const scores = {};
    aromas.forEach(aroma => {
        let score = 0;
        aroma.families.forEach(f => {
            score += (familyScores[f] || 0);
        });
        // Penalización si hay aversión explícita (podríamos añadir pregunta futura)
        scores[aroma.name] = score;
    });

    // 4. Separar por capas y ordenar
    const layers = { top: [], heart: [], base: [] };
    aromas.forEach(aroma => {
        layers[aroma.layer].push({ ...aroma, score: scores[aroma.name] });
    });
    for (const layer in layers) {
        layers[layer].sort((a, b) => b.score - a.score);
    }

    // 5. Seleccionar las mejores notas (limitado a 6 notas por género, pero usaremos pocas)
    // Para mujer: 6 aromas, para hombre: 6 aromas. Podemos seleccionar todas si son positivas.
    // Pero para mantener la pirámide, elegimos al menos 1-2 por capa disponibles.
    const selected = { top: [], heart: [], base: [] };
    for (const layer in layers) {
        if (layers[layer].length > 0) {
            // Tomamos todas las notas de esa capa que tengan score > 0, o al menos la mejor
            const candidates = layers[layer].filter(a => a.score > 0);
            if (candidates.length === 0) candidates.push(layers[layer][0]); // al menos una
            selected[layer] = candidates;
        }
    }

    // 6. Calcular proporciones dentro de cada capa según intensidad preferida
    // Primero determinamos intensidad general desde las respuestas de intensidad (q9,q10)
    let intensityPreference = 'moderado';
    const q9Cat = categories.find(c => ['suave','moderado','intensa','intenso','variable'].includes(c));
    if (q9Cat === 'suave' || q9Cat === 'suave') intensityPreference = 'suave';
    else if (q9Cat === 'intensa' || q9Cat === 'intenso') intensityPreference = 'intenso';
    else if (q9Cat === 'moderado') intensityPreference = 'moderado';

    const layerDistribution = {
        suave: { top: 0.15, heart: 0.45, base: 0.40 },
        moderado: { top: 0.25, heart: 0.40, base: 0.35 },
        intenso: { top: 0.20, heart: 0.35, base: 0.45 }
    }[intensityPreference] || { top: 0.25, heart: 0.40, base: 0.35 };

    const formulaNotes = {};
    for (const layer in selected) {
        const notes = selected[layer];
        if (notes.length === 0) continue;
        const totalScore = notes.reduce((sum, n) => sum + n.score, 0);
        const layerTotal = layerDistribution[layer] * 100;
        formulaNotes[layer] = notes.map(note => ({
            name: note.name,
            percentage: parseFloat(((note.score / totalScore) * layerTotal).toFixed(1))
        }));
    }

    // 7. Generar nombre y descripción
    const mainCategory = categories[0] || 'personalizado';
    const perfumeName = `Esencias ${gender === 'mujer' ? 'Femeninas' : 'Masculinas'}: ${mainCategory}`;
    const desc = `Una combinación única que refleja tu estilo ${mainCategory}. Notas: ${
        Object.values(formulaNotes).flat().map(n => n.name).join(', ')
    }.`;

    return { name: perfumeName, description: desc, notes: formulaNotes };
}

module.exports = { generatePerfume };