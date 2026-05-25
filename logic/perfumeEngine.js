// ============ PREGUNTAS UNIVERSALES (primeras 5) ============
const universalWeights = {
    // Pregunta 1: ¿Un sábado libre, qué prefieres hacer?
    sabado: {
        "Café, paseo y momentos tranquilos": { floral: 2, dulce: 2, suave: 3, romántico: 2 },
        "Salir y estar con amigos": { frutal: 2, cítrico: 2, alegre: 3, vibrante: 2 },
        "Casa, lectura y descanso": { amaderado: 1, verde: 2, fresco: 2, suave: 3 },
        "Naturaleza o deporte": { cítrico: 3, fresco: 3, verde: 2, energético: 3 }
    },
    // Pregunta 2: ¿Cuál de estas palabras te describe mejor?
    personalidad: {
        "Soñadora y romántica": { floral: 3, romántico: 3, dulce: 2 },
        "Apasionada e intensa": { oriental: 2, intenso: 3, especiado: 2 },
        "Tranquila y equilibrada": { suave: 3, fresco: 2, sereno: 2 },
        "Espontánea y alegre": { frutal: 2, alegre: 3, vibrante: 2 },
        "Seguro y sereno": { amaderado: 2, sereno: 3, clásico: 2 },
        "Intenso y directo": { intenso: 3, especiado: 2, oriental: 2 },
        "Libre y espontáneo": { fresco: 3, cítrico: 2, energético: 2 },
        "Enfocado y ambicioso": { sofisticado: 2, elegante: 2, amaderado: 1 }
    },
    // Pregunta 3: ¿Qué paisaje te transmite paz?
    paisaje: {
        "Bosque húmedo": { amaderado: 2, verde: 3, fresco: 1, bosque: 3 },
        "Playa al atardecer": { marino: 3, acuático: 2, fresco: 2, romántico: 1 },
        "Jardín de rosas": { floral: 3, romántico: 2, clásico: 1, elegante: 2 },
        "Montaña nevada": { fresco: 2, puro: 3, amaderado: 1, sereno: 2 },
        "Campo de lavanda": { floral: 2, fresco: 3, natural: 2, suave: 1 },
        "Ciudad vibrante de noche": { nocturno: 2, intenso: 2, sofisticado: 2, oriental: 1 }
    },
    // Pregunta 4: ¿Qué color te representa más?
    color: {
        "Rojo o rosa": { intenso: 2, floral: 2, apasionado: 3 },
        "Blanco o beige": { suave: 3, puro: 2, fresco: 1 },
        "Morado o azul": { romántico: 2, sereno: 2, elegante: 2 },
        "Verde o amarillo": { fresco: 2, natural: 2, energético: 2 },
        "Negro o gris": { intenso: 3, sofisticado: 2, misterioso: 2 },
        "Azul marino o verde oscuro": { clásico: 3, sereno: 2, elegante: 1 },
        "Café o terracota": { amaderado: 2, cálido: 2, natural: 1 }
    },
    // Pregunta 5: ¿Qué música escuchas más?
    musica: {
        "Pop romántico o baladas": { romántico: 3, dulce: 2, floral: 1 },
        "Reggaeton o electrónica": { vibrante: 2, energético: 3, alegre: 1 },
        "Indie o alternativa": { fresco: 2, natural: 1, puro: 1 },
        "Salsa o tropical": { tropical: 2, alegre: 3, exótico: 1 },
        "Trap, rap o urbano": { intenso: 3, nocturno: 2, especiado: 1 },
        "Rock o alternativa": { clásico: 2, intenso: 2, amaderado: 1 },
        "Jazz, soul o lo-fi": { sofisticado: 3, elegante: 2, sereno: 1 }
    }
};

// ============ PREGUNTAS ESPECÍFICAS DE GÉNERO (preguntas 6-15) ============
const genderSpecificWeights = {
    mujer: {
        q6: {
            "Frutales y afrutados": { frutal: 3 },
            "Florales y delicados": { floral: 3 },
            "Dulces y cremosos": { dulce: 3, gourmand: 1 },
            "Cítricos y frescos": { cítrico: 3 }
        },
        q7: {
            "Me encantan, entre más dulce mejor": { dulce: 4, gourmand: 2 },
            "Me gustan pero con equilibrio": { dulce: 2 },
            "Los tolero pero no son mis favoritos": { dulce: -2, fresco: 1 },
            "No me gustan nada": { dulce: -4, fresco: 2 }
        },
        q8: {
            "Coco tropical": { tropical: 3, exótico: 1 },
            "Fresa y frutos rojos": { frutal: 3, alegre: 2 },
            "Durazno y fruta suave": { suave: 3, delicado: 2 },
            "Rosa y floral": { floral: 3, romántico: 2 }
        },
        q9: {
            "Muy suave, apenas perceptible": { suave: 4 },
            "Moderado y equilibrado": { moderado: 2 },
            "Intenso y hostigante": { intenso: 3 },
            "Variable según el momento": { variable: 2 }
        },
        q10: {
            "Sí, prefiero siempre algo discreto": { suave: 3 },
            "No, me gustan los que se notan": { intenso: 3 },
            "Depende del aroma": { moderado: 1 },
            "Solo de noche me gustan intensos": { nocturno: 2, intenso: 1 }
        }
    },
    hombre: {
        q6: {
            "Frescos y acuáticos": { fresco: 3, acuático: 2 },
            "Amaderados y naturales": { amaderado: 3, natural: 2 },
            "Cítricos y energéticos": { cítrico: 3, energético: 2 },
            "Intensos y misteriosos": { intenso: 3, misterioso: 2 }
        },
        q7: {
            "No me gustan nada": { dulce: -4, fresco: 2 },
            "Los tolero solo como nota de fondo": { dulce: -1, amaderado: 1 },
            "Me gustan con equilibrio": { dulce: 2 },
            "Me encantan": { dulce: 4, gourmand: 2 }
        },
        q8: {
            "Brisa marina y frescura": { fresco: 3, marino: 2 },
            "Pino o bosque": { verde: 3, bosque: 2 },
            "Sándalo o madera": { amaderado: 3, sereno: 2 },
            "Oriental o buena noche": { oriental: 3, nocturno: 2 }
        },
        q9: {
            "Suave y discreto": { suave: 4 },
            "Moderado y equilibrado": { moderado: 2 },
            "Fuerte e impactante": { intenso: 3 },
            "Suave de día, intenso de noche": { variable: 2 }
        },
        q10: {
            "Sí, prefiero siempre discreto": { suave: 3 },
            "No, me gustan los que se notan": { intenso: 3 },
            "Depende del aroma": { moderado: 1 },
            "Solo de noche intensos": { nocturno: 2, intenso: 1 }
        }
    }
};

function generatePerfume(answers, aromas) {
    const gender = answers.gender;
    if (!gender || !['mujer', 'hombre'].includes(gender)) {
        throw new Error('Género no válido');
    }

    const familyScores = {};

    // 1. Procesar preguntas universales (q1 a q5)
    const universalQuestions = ['sabado', 'personalidad', 'paisaje', 'color', 'musica'];
    for (let i = 0; i < universalQuestions.length; i++) {
        const questionKey = universalQuestions[i];
        const answerText = answers[`q${i + 1}`];
        if (answerText && universalWeights[questionKey] && universalWeights[questionKey][answerText]) {
            const weights = universalWeights[questionKey][answerText];
            for (const [family, weight] of Object.entries(weights)) {
                familyScores[family] = (familyScores[family] || 0) + weight;
            }
        }
    }

    // 2. Procesar preguntas específicas de género (q6 a q10)
    const genderWeights = genderSpecificWeights[gender];
    for (let i = 6; i <= 10; i++) {
        const questionKey = `q${i}`;
        const answerText = answers[`q${i}`];
        if (answerText && genderWeights[questionKey] && genderWeights[questionKey][answerText]) {
            const weights = genderWeights[questionKey][answerText];
            for (const [family, weight] of Object.entries(weights)) {
                familyScores[family] = (familyScores[family] || 0) + weight;
            }
        }
    }

    // 3. Determinar intensidad general
    let intensityLevel = 'moderado';
    const intensityKeywords = Object.values(answers).join(' ');
    if (intensityKeywords.includes('suave') || intensityKeywords.includes('discreto') || intensityKeywords.includes('Suave')) {
        intensityLevel = 'suave';
    } else if (intensityKeywords.includes('intenso') || intensityKeywords.includes('fuerte') || intensityKeywords.includes('impactante') || intensityKeywords.includes('hostigante')) {
        intensityLevel = 'intenso';
    }

    // 4. Filtrar aromas del género y calcular puntuación
    const genderAromas = aromas.filter(a => a.gender === gender);
    const scored = genderAromas.map(aroma => {
        let score = 0;
        aroma.families.forEach(f => {
            score += (familyScores[f] || 0);
        });
        return { ...aroma, score };
    });

    // 5. Ordenar por puntuación y seleccionar máximo 5
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

    // Si hay menos de 2 aromas seleccionados, forzar al menos 2
    if (selected.length < 2) {
        selected = scored.slice(0, Math.min(2, scored.length));
    }

    // 6. Calcular gotas para muestras (totales pequeños)
    const totalDrops = {
        suave: 12,
        moderado: 16,
        intenso: 20
    }[intensityLevel] || 16;

    // Asignar gotas proporcionalmente
    const minScore = Math.min(...selected.map(a => a.score));
    const shift = Math.abs(minScore) + 1;
    const adjusted = selected.map(a => ({ ...a, adjScore: a.score + shift }));
    const totalAdj = adjusted.reduce((sum, a) => sum + a.adjScore, 0);

    let drops = adjusted.map(a => Math.max(1, Math.floor((a.adjScore / totalAdj) * totalDrops)));
    
    // Ajustar para que sumen exactamente totalDrops
    let currentTotal = drops.reduce((s, d) => s + d, 0);
    let diff = totalDrops - currentTotal;
    
    // Repartir gotas sobrantes/faltantes entre las notas
    while (diff !== 0) {
        if (diff > 0) {
            // Añadir gotas a las notas con mayor puntuación
            let maxIdx = 0;
            for (let i = 1; i < adjusted.length; i++) {
                if (adjusted[i].adjScore > adjusted[maxIdx].adjScore) maxIdx = i;
            }
            drops[maxIdx]++;
            diff--;
        } else {
            // Quitar gotas de las notas con menor puntuación (pero no bajar de 1)
            let minIdx = 0;
            for (let i = 1; i < adjusted.length; i++) {
                if (adjusted[i].adjScore < adjusted[minIdx].adjScore && drops[i] > 1) minIdx = i;
            }
            if (drops[minIdx] > 1) {
                drops[minIdx]--;
                diff++;
            } else {
                break; // no se puede ajustar más
            }
        }
    }

    const resultNotes = selected.map((a, idx) => ({
        name: a.name,
        drops: drops[idx],
        layer: a.layer
    }));

    // 7. Generar nombre y descripción atractiva
    const mainCategory = answers.q2 || 'personalizado';
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