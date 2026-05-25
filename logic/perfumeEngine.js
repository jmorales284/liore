// ============ MAPEO RESPUESTAS -> CATEGORÍAS ============
const answerToCategory = {
    mujer: {
        pregunta1: {
            "Café, paseo y momentos tranquilos": "romantica",
            "Salir y estar con amigos": "social",
            "Casa, lectura y descanso": "introspectiva",
            "Naturaleza o deporte": "activa"
        },
        // Pregunta 2 fusionada
        pregunta2: {
            "Romántica y cálida": "romantica",
            "Apasionada y elegante": "intensa",
            "Tranquila y sensible": "suave",
            "Fresca y auténtica": "fresca"
        },
        // Pregunta 3 (antes 4)
        pregunta3: {
            "Rojo o rosa": "intensa",
            "Blanco o beige": "suave",
            "Morado o azul": "romantica",
            "Verde o amarillo": "fresca"
        },
        // Pregunta 4 (antes 5)
        pregunta4: {
            "Pop romántico o baladas": "romantica",
            "Reggaeton o electrónica": "social",
            "Indie o alternativa": "introspectiva",
            "Salsa o tropical": "activa"
        },
        // Pregunta 5 (antes 6)
        pregunta5: {
            "Frutales y afrutados": "frutal",
            "Florales y delicados": "floral",
            "Dulces y cremosos": "dulce",
            "Cítricos y frescos": "citrico"
        },
        // Pregunta 6 (antes 7)
        pregunta6: {
            "Me encantan, entre más dulce mejor": "muydulce",
            "Me gustan pero con equilibrio": "dulce",
            "Los tolero pero no son mis favoritos": "nodulce",
            "No me gustan nada": "nodulce"
        },
        // Pregunta 7 (antes 8)
        pregunta7: {
            "Coco tropical": "tropical",
            "Fresa y frutos rojos": "frutal",
            "Durazno y fruta suave": "suave",
            "Rosa y floral": "floral"
        },
        // Pregunta 8 (intensidad original)
        pregunta8: {
            "Muy suave, apenas perceptible": "suave",
            "Moderado y equilibrado": "moderado",
            "Intenso y hostigante": "intensa",
            "Variable según el momento": "variable"
        },
        // Pregunta 9 (molestia original)
        pregunta9: {
            "Sí, prefiero siempre algo discreto": "suave",
            "No, me gustan los que se notan": "intensa",
            "Depende del aroma": "moderado",
            "Solo de noche me gustan intensos": "variable"
        },
        // Pregunta 10 (NUEVA - estilo de vida)
        pregunta10: {
            "Deporte / voy al gimnasio": "deporte",
            "Trabajo en oficina / negocio": "trabajo",
            "Estudio / universidad": "estudio",
            "Un poco de todo": "social"
        },
        // Pregunta 11 (NUEVA - ocasión)
        pregunta11: {
            "Día a día / diario": "diario",
            "Ocasiones especiales / noche": "especial"
        }
    },
    hombre: {
        pregunta1: {
            "Deporte o actividad física": "activo",
            "Descansar en casa": "tranquilo",
            "Salir con amigos": "social",
            "Explorar algo nuevo": "aventurero"
        },
        // Pregunta 2 fusionada
        pregunta2: {
            "Seguro y con presencia": "clasico",
            "Intenso y con carácter": "intenso",
            "Libre y auténtico": "fresco",
            "Sofisticado y con estilo": "sofisticado"
        },
        // Pregunta 3 (antes 4)
        pregunta3: {
            "Negro o gris": "intenso",
            "Azul marino o verde oscuro": "clasico",
            "Blanco o beige": "fresco",
            "Café o terracota": "sofisticado"
        },
        // Pregunta 4 (antes 5)
        pregunta4: {
            "Trap, rap o urbano": "intenso",
            "Rock o alternativa": "clasico",
            "Electrónica o reggaeton": "social",
            "Jazz, soul o lo-fi": "sofisticado"
        },
        // Pregunta 5 (antes 6)
        pregunta5: {
            "Frescos y acuáticos": "fresco",
            "Amaderados y naturales": "amaderado",
            "Cítricos y energéticos": "citrico",
            "Intensos y misteriosos": "intenso"
        },
        // Pregunta 6 (antes 7)
        pregunta6: {
            "No me gustan nada": "nodulce",
            "Los tolero solo como nota de fondo": "nodulce",
            "Me gustan con equilibrio": "dulce",
            "Me encantan": "muydulce"
        },
        // Pregunta 7 (antes 8)
        pregunta7: {
            "Brisa marina y frescura": "fresco",
            "Pino o bosque": "verde",
            "Sándalo o madera": "amaderado",
            "Oriental o buena noche": "intenso"
        },
        // Pregunta 8 (intensidad original)
        pregunta8: {
            "Suave y discreto": "suave",
            "Moderado y equilibrado": "moderado",
            "Fuerte e impactante": "intenso",
            "Suave de día, intenso de noche": "variable"
        },
        // Pregunta 9 (molestia original)
        pregunta9: {
            "Sí, prefiero siempre discreto": "suave",
            "No, me gustan los que se notan": "intenso",
            "Depende del aroma": "moderado",
            "Solo de noche intensos": "variable"
        },
        // Pregunta 10 (NUEVA - estilo de vida)
        pregunta10: {
            "Deporte / voy al gimnasio": "deporte",
            "Trabajo en oficina / negocio": "trabajo",
            "Estudio / universidad": "estudio",
            "Un poco de todo": "social"
        },
        // Pregunta 11 (NUEVA - ocasión)
        pregunta11: {
            "Día a día / diario": "diario",
            "Ocasiones especiales / noche": "especial"
        }
    }
};

// ============ PESOS DE CATEGORÍAS A FAMILIAS OLFATIVAS ============
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
    // Preferencias directas
    frutal: { frutal: 3 },
    floral: { floral: 3 },
    citrico: { cítrico: 3 },
    amaderado: { amaderado: 3 },
    tropical: { tropical: 3, exótico: 1 },
    verde: { verde: 3, bosque: 2 },
    // NUEVAS CATEGORÍAS (estilo de vida y ocasión)
    deporte: { cítrico: 2, fresco: 2, energético: 2 },
    trabajo: { amaderado: 1, elegante: 2, fresco: 1 },
    estudio: { suave: 2, fresco: 1, verde: 1 },
    diario: { fresco: 2, cítrico: 1, suave: 1 },
    especial: { intenso: 2, oriental: 2, elegante: 2 }
};

function generatePerfume(answers, aromas) {
    const gender = answers.gender;
    const mapping = answerToCategory[gender];
    if (!mapping) throw new Error('Género no válido');

    // 1. Obtener categorías de cada pregunta (ahora 1-11)
    const categories = [];
    for (let i = 1; i <= 11; i++) {
        const questionKey = `pregunta${i}`;
        const answerText = answers[`q${i}`];
        if (answerText && mapping[questionKey] && mapping[questionKey][answerText]) {
            categories.push(mapping[questionKey][answerText]);
        }
    }

    // 2. Calcular peso acumulado por familia
    const familyScores = {};
    categories.forEach(cat => {
        const weights = categoryWeights[cat] || {};
        for (const [family, weight] of Object.entries(weights)) {
            familyScores[family] = (familyScores[family] || 0) + weight;
        }
    });

    // 3. Determinar intensidad general (para gotas)
    let intensityLevel = 'moderado';
    const intensityCat = categories.find(c => ['suave','moderado','intensa','intenso'].includes(c));
    if (intensityCat === 'suave') intensityLevel = 'suave';
    else if (intensityCat === 'intensa' || intensityCat === 'intenso') intensityLevel = 'intenso';

    // 4. Filtrar aromas del género y calcular puntuación
    const genderAromas = aromas.filter(a => a.gender === gender);
    const scored = genderAromas.map(aroma => {
        let score = 0;
        aroma.families.forEach(f => {
            score += (familyScores[f] || 0);
        });
        return { ...aroma, score };
    });

    // 5. Seleccionar máximo 5 aromas
    scored.sort((a, b) => b.score - a.score);
    const MAX_NOTES = 5;
    const positive = scored.filter(a => a.score > 0);
    let selected;
    if (positive.length >= MAX_NOTES) {
        selected = positive.slice(0, MAX_NOTES);
    } else {
        const remaining = scored.filter(a => a.score <= 0);
        selected = positive.concat(remaining).slice(0, MAX_NOTES);
    }
    if (selected.length < 2) {
        selected = scored.slice(0, Math.min(2, scored.length));
    }

    // 6. Repartir gotas (máximo 8)
    const totalDrops = {
        suave: 5,
        moderado: 7,
        intenso: 8
    }[intensityLevel] || 7;

    const minScore = Math.min(...selected.map(a => a.score));
    const shift = Math.abs(minScore) + 1;
    const adjusted = selected.map(a => ({ ...a, adjScore: a.score + shift }));
    const totalAdj = adjusted.reduce((sum, a) => sum + a.adjScore, 0);

    let drops = adjusted.map(a => Math.max(1, Math.floor((a.adjScore / totalAdj) * totalDrops)));
    let currentTotal = drops.reduce((s, d) => s + d, 0);
    let diff = totalDrops - currentTotal;
    while (diff !== 0) {
        if (diff > 0) {
            let maxIdx = 0;
            for (let i = 1; i < adjusted.length; i++) {
                if (adjusted[i].adjScore > adjusted[maxIdx].adjScore) maxIdx = i;
            }
            drops[maxIdx]++;
            diff--;
        } else {
            let minIdx = 0;
            for (let i = 1; i < adjusted.length; i++) {
                if (adjusted[i].adjScore < adjusted[minIdx].adjScore && drops[i] > 1) minIdx = i;
            }
            if (drops[minIdx] > 1) {
                drops[minIdx]--;
                diff++;
            } else {
                break;
            }
        }
    }

    const resultNotes = selected.map((a, idx) => ({
        name: a.name,
        drops: drops[idx],
        layer: a.layer
    }));

    // 7. Nombre y descripción
    const mainCategory = categories[0] || 'personalizado';
    const perfumeName = `${gender === 'mujer' ? '✨' : '🌲'} ${mainCategory} ${gender === 'mujer' ? 'Femme' : 'Homme'}`;
    const notesList = resultNotes.map(n => `${n.name} (${n.drops} gotas)`).join(', ');
    const desc = `Muestra personalizada de ${totalDrops} gotas. Intensidad ${intensityLevel}. ` +
                 `Una combinación única que refleja tu esencia. Contiene: ${notesList}.`;

    return {
        name: perfumeName,
        description: desc,
        notes: resultNotes,
        totalDrops: totalDrops,
        intensity: intensityLevel
    };
}

module.exports = { generatePerfume };