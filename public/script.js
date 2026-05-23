const questions = {
    mujer: [
        { text: "¿Un sábado libre, qué prefieres hacer?", options: ["Café, paseo y momentos tranquilos", "Salir y estar con amigos", "Casa, lectura y descanso", "Naturaleza o deporte"] },
        { text: "¿Cuál de estas palabras te describe mejor?", options: ["Soñadora y romántica", "Apasionada e intensa", "Tranquila y equilibrada", "Espontánea y alegre"] },
        { text: "¿Cómo quieres que te recuerden?", options: ["Por mi calidez y ternura", "Por mi elegancia y estilo", "Por mi frescura y autenticidad", "Por mi paz y sensibilidad"] },
        { text: "¿Qué color te representa más?", options: ["Rojo o rosa", "Blanco o beige", "Morado o azul", "Verde o amarillo"] },
        { text: "¿Qué música escuchas más?", options: ["Pop romántico o baladas", "Reggaeton o electrónica", "Indie o alternativa", "Salsa o tropical"] },
        { text: "¿Qué tipo de aromas prefieres en general?", options: ["Frutales y afrutados", "Florales y delicados", "Dulces y cremosos", "Cítricos y frescos"] },
        { text: "¿Qué tanto te gustan los aromas dulces?", options: ["Me encantan, entre más dulce mejor", "Me gustan pero con equilibrio", "Los tolero pero no son mis favoritos", "No me gustan nada"] },
        { text: "¿Cuál de estas notas te atrae más?", options: ["Coco tropical", "Fresa y frutos rojos", "Durazno y fruta suave", "Rosa y floral"] },
        { text: "¿Cómo prefieres la intensidad del aroma?", options: ["Muy suave, apenas perceptible", "Moderado y equilibrado", "Intenso y hostigante", "Variable según el momento"] },
        { text: "¿Te molestan los aromas muy fuertes u hostigantes?", options: ["Sí, prefiero siempre algo discreto", "No, me gustan los que se notan", "Depende del aroma", "Solo de noche me gustan intensos"] }
    ],
    hombre: [
        { text: "¿Un sábado libre, qué prefieres hacer?", options: ["Deporte o actividad física", "Descansar en casa", "Salir con amigos", "Explorar algo nuevo"] },
        { text: "¿Cuál de estas palabras te describe mejor?", options: ["Seguro y sereno", "Intenso y directo", "Libre y espontáneo", "Enfocado y ambicioso"] },
        { text: "¿Cómo quieres que te recuerden?", options: ["Por mi seguridad y presencia", "Por mi frescura y autenticidad", "Por mi intensidad y carácter", "Por mi estilo y sofisticación"] },
        { text: "¿Qué color te representa más?", options: ["Negro o gris", "Azul marino o verde oscuro", "Blanco o beige", "Café o terracota"] },
        { text: "¿Qué música escuchas más?", options: ["Trap, rap o urbano", "Rock o alternativa", "Electrónica o reggaeton", "Jazz, soul o lo-fi"] },
        { text: "¿Qué tipo de aromas prefieres en general?", options: ["Frescos y acuáticos", "Amaderados y naturales", "Cítricos y energéticos", "Intensos y misteriosos"] },
        { text: "¿Qué tanto te gustan los aromas dulces?", options: ["No me gustan nada", "Los tolero solo como nota de fondo", "Me gustan con equilibrio", "Me encantan"] },
        { text: "¿Cuál de estas notas te atrae más?", options: ["Brisa marina y frescura", "Pino o bosque", "Sándalo o madera", "Oriental o buena noche"] },
        { text: "¿Cómo prefieres la intensidad del aroma?", options: ["Suave y discreto", "Moderado y equilibrado", "Fuerte e impactante", "Suave de día, intenso de noche"] },
        { text: "¿Te molestan los aromas muy fuertes u hostigantes?", options: ["Sí, prefiero siempre discreto", "No, me gustan los que se notan", "Depende del aroma", "Solo de noche intensos"] }
    ]
};

let currentStep = 0;
let gender = null;
let answers = {};

const stepContent = document.getElementById('step-content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const stepIndicator = document.getElementById('step-indicator');

function renderStep() {
    if (!gender) {
        // Selección de género
        stepContent.innerHTML = `
            <h2>Selecciona tu género</h2>
            <div class="options-grid">
                <button class="option" data-gender="mujer">👩 Mujer</button>
                <button class="option" data-gender="hombre">👨 Hombre</button>
            </div>
        `;
        document.querySelectorAll('.option[data-gender]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                gender = e.target.dataset.gender;
                answers.gender = gender;
                currentStep = 0; // empezamos preguntas
                renderStep();
            });
        });
        nextBtn.style.display = 'none';
        prevBtn.style.display = 'none';
        stepIndicator.textContent = '';
    } else {
        const qList = questions[gender];
        if (currentStep < qList.length) {
            const q = qList[currentStep];
            let html = `<h2>${q.text}</h2><div class="options-grid">`;
            q.options.forEach(opt => {
                const selectedClass = answers[`q${currentStep+1}`] === opt ? 'selected' : '';
                html += `<button class="option ${selectedClass}" data-answer="${opt}">${opt}</button>`;
            });
            html += `</div>`;
            stepContent.innerHTML = html;

            document.querySelectorAll('.option[data-answer]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const answer = e.target.dataset.answer;
                    answers[`q${currentStep+1}`] = answer;
                    // resaltar selección
                    document.querySelectorAll('.option[data-answer]').forEach(b => b.classList.remove('selected'));
                    e.target.classList.add('selected');
                });
            });

            nextBtn.style.display = 'inline-block';
            prevBtn.style.display = 'inline-block';
            stepIndicator.textContent = `Pregunta ${currentStep+1} de ${qList.length}`;
        } else {
            // Mostrar resultado
            stepContent.innerHTML = `
                <div class="loading-spinner" id="loading">
                    <div class="spinner"></div>
                    <p>Creando tu perfume personalizado...</p>
                </div>
                <div id="result-container" style="display:none;"></div>
            `;
            nextBtn.style.display = 'none';
            prevBtn.style.display = 'none';
            stepIndicator.textContent = 'Generando...';
            sendAnswers();
        }
    }
}

async function sendAnswers() {
    try {
        const response = await fetch('/api/create-perfume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(answers)
        });
        if (!response.ok) throw new Error('Error');
        const formula = await response.json();
        document.getElementById('loading').style.display = 'none';
        const resDiv = document.getElementById('result-container');
        resDiv.style.display = 'block';
        resDiv.innerHTML = `
            <h2>✨ Tu perfume personalizado</h2>
            <div class="perfume-card">
                <h3>${formula.name}</h3>
                <p>${formula.description}</p>
                <div class="notes-breakdown">
                    ${formula.notes.top ? `<div class="layer"><strong>Salida:</strong> ${formula.notes.top.map(n=>n.name+' ('+n.percentage+'%)').join(', ')}</div>` : ''}
                    ${formula.notes.heart ? `<div class="layer"><strong>Corazón:</strong> ${formula.notes.heart.map(n=>n.name+' ('+n.percentage+'%)').join(', ')}</div>` : ''}
                    ${formula.notes.base ? `<div class="layer"><strong>Fondo:</strong> ${formula.notes.base.map(n=>n.name+' ('+n.percentage+'%)').join(', ')}</div>` : ''}
                </div>
                <button id="restart-btn">↩ Crear otro perfume</button>
            </div>
        `;
        document.getElementById('restart-btn').addEventListener('click', () => {
            gender = null;
            answers = {};
            currentStep = 0;
            renderStep();
        });
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } catch (err) {
        alert('Error al generar el perfume. Intenta de nuevo.');
        gender = null;
        answers = {};
        currentStep = 0;
        renderStep();
    }
}

nextBtn.addEventListener('click', () => {
    if (gender && currentStep < questions[gender].length) {
        if (!answers[`q${currentStep+1}`]) {
            alert('Por favor selecciona una opción');
            return;
        }
        currentStep++;
        renderStep();
    }
});

prevBtn.addEventListener('click', () => {
    if (gender && currentStep > 0) {
        currentStep--;
        renderStep();
    } else if (gender && currentStep === 0) {
        // Volver a selección de género
        gender = null;
        answers = {};
        currentStep = 0;
        renderStep();
    }
});

// Iniciar
renderStep();
