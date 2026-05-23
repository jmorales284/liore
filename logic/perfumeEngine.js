// Mapeo de categorías a pesos por familia (sin cambios)
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
    // Dulzura
    muydulce: { gourmand: 3, dulce: 4 },
    nodulce: { gourmand: -3, dulce: -3, seco: 2, amaderado: 1 },
    moderado: {},
    variable: {},
    // Preferencias directas (pregunta 6)
    frutal: { frutal: 3 },
    floral: { floral: 3 },
    dulce: { dulce: 3 },
    citrico: { cítrico: 3 },
    amaderado: { amaderado: 3 },
    intenso: { oriental: 2, especiado: 2, intenso: 2 }
};

// Traducción respuestas -> categorías (sin cambios, pero la incluimos completa)
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
            "Coco tropical": "tropical",
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
    const gender = answers.gender;
    const mapping = answerToCategory[gender];
    if (!mapping) throw new Error('Género no válido');

    // 1. Obtener categorías de cada respuesta
    const categories = [];
    for (let i = 1; i <= 10; i++) {
        const answerText = answers[`q${i}`];
        if (answerText && mapping[`pregunta${i}`] && mapping[`pregunta${i}`][answerText]) {
            categories.push(mapping[`pregunta${i}`][answerText]);
        }
    }

    // 2. Puntuar familias
    const familyScores = {};
    categories.forEach(cat => {
        const weights = categoryWeights[cat] || {};
        for (const [family, weight] of Object.entries(weights)) {
            familyScores[family] = (familyScores[family] || 0) + weight;
        }
    });

    // 3. Filtrar aromas del género y calcular puntuación
    const genderAromas = aromas.filter(a => a.gender === gender);
    const scored = genderAromas.map(aroma => {
        let score = 0;
        aroma.families.forEach(f => {
            score += (familyScores[f] || 0);
        });
        return { ...aroma, score };
    });

    // 4. Ordenar por puntuación descendente
    scored.sort((a, b) => b.score - a.score);

    // 5. Seleccionar máximo 5 aromas, dando prioridad a los de score positivo
    const MAX_NOTES = 5;
    const positive = scored.filter(a => a.score > 0);
    let selected;
    if (positive.length >= MAX_NOTES) {
        selected = positive.slice(0, MAX_NOTES);
    } else {
        // Tomamos todos los positivos y completamos con los mejores (incluso negativos) hasta MAX_NOTES
        const remaining = scored.filter(a => a.score <= 0);
        selected = positive.concat(remaining).slice(0, MAX_NOTES);
    }

    // 6. Determinar intensidad a partir de categorías de q9/q10
    let intensityLevel = 'moderado';
    const intensityCat = categories.find(c => ['suave','moderado','intensa','intenso'].includes(c));
    if (intensityCat === 'suave') intensityLevel = 'suave';
    else if (intensityCat === 'intensa' || intensityCat === 'intenso') intensityLevel = 'intenso';
    else if (intensityCat === 'moderado') intensityLevel = 'moderado';

    const totalDrops = { suave: 80, moderado: 120, intenso: 160 }[intensityLevel] || 120;

    // 7. Asignar gotas proporcionalmente al score (mínimo 1 gota)
    const minScore = Math.min(...selected.map(a => a.score));
    const shift = Math.abs(minScore) + 1;
    const adjusted = selected.map(a => ({ ...a, adjScore: a.score + shift }));
    const totalAdj = adjusted.reduce((sum, a) => sum + a.adjScore, 0);

    let drops = adjusted.map(a => Math.floor((a.adjScore / totalAdj) * totalDrops));
    // Ajustar para que sumen totalDrops
    let diff = totalDrops - drops.reduce((s, d) => s + d, 0);
    // Repartir las gotas sobrantes entre las notas con mayor score ajustado
    for (let i = 0; i < diff; i++) {
        // Índice con mayor adjScore (y que no tenga 0? cualquiera)
        let maxIdx = 0;
        for (let j = 1; j < adjusted.length; j++) {
            if (adjusted[j].adjScore > adjusted[maxIdx].adjScore) maxIdx = j;
        }
        drops[maxIdx]++;
    }

    const resultNotes = selected.map((a, idx) => ({
        name: a.name,
        drops: drops[idx]
    }));

    // 8. Nombre y descripción
    const mainCategory = categories[0] || 'personalizado';
    const perfumeName = `Esencias ${gender === 'mujer' ? 'Femeninas' : 'Masculinas'}: ${mainCategory}`;
    const notesList = resultNotes.map(n => `${n.name} (${n.drops} gotas)`).join(', ');
    const desc = `Fórmula para ambientador con un total de ${totalDrops} gotas. Intensidad ${intensityLevel}. Notas: ${notesList}.`;

    return { name: perfumeName, description: desc, notes: resultNotes };
}

module.exports = { generatePerfume };