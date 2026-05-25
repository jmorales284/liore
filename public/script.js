// ==================== PREGUNTAS ====================
const universalQuestions = [
    {
        text: "¿Un sábado libre, qué prefieres hacer?",
        options: ["Café, paseo y momentos tranquilos", "Salir y estar con amigos", "Casa, lectura y descanso", "Naturaleza o deporte"]
    },
    {
        text: "¿Cuál de estas palabras te describe mejor?",
        options: {
            mujer: ["Soñadora y romántica", "Apasionada e intensa", "Tranquila y equilibrada", "Espontánea y alegre"],
            hombre: ["Seguro y sereno", "Intenso y directo", "Libre y espontáneo", "Enfocado y ambicioso"]
        }
    },
    {
        text: "Elige un paisaje que te transmita paz:",
        options: ["Bosque húmedo", "Playa al atardecer", "Jardín de rosas", "Montaña nevada", "Campo de lavanda", "Ciudad vibrante de noche"]
    },
    {
        text: "¿Qué color te representa más?",
        options: {
            mujer: ["Rojo o rosa", "Blanco o beige", "Morado o azul", "Verde o amarillo"],
            hombre: ["Negro o gris", "Azul marino o verde oscuro", "Blanco o beige", "Café o terracota"]
        }
    },
    {
        text: "¿Qué música escuchas más?",
        options: {
            mujer: ["Pop romántico o baladas", "Reggaeton o electrónica", "Indie o alternativa", "Salsa o tropical"],
            hombre: ["Trap, rap o urbano", "Rock o alternativa", "Electrónica o reggaeton", "Jazz, soul o lo-fi"]
        }
    }
];

const genderQuestions = {
    mujer: [
        { text: "¿Qué tipo de aromas prefieres en general?", options: ["Frutales y afrutados", "Florales y delicados", "Dulces y cremosos", "Cítricos y frescos"] },
        { text: "¿Qué tanto te gustan los aromas dulces?", options: ["Me encantan, entre más dulce mejor", "Me gustan pero con equilibrio", "Los tolero pero no son mis favoritos", "No me gustan nada"] },
        { text: "¿Cuál de estas notas te atrae más?", options: ["Coco tropical", "Fresa y frutos rojos", "Durazno y fruta suave", "Rosa y floral"] },
        { text: "¿Cómo prefieres la intensidad del aroma?", options: ["Muy suave, apenas perceptible", "Moderado y equilibrado", "Intenso y hostigante", "Variable según el momento"] },
        { text: "¿Te molestan los aromas muy fuertes u hostigantes?", options: ["Sí, prefiero siempre algo discreto", "No, me gustan los que se notan", "Depende del aroma", "Solo de noche me gustan intensos"] }
    ],
    hombre: [
        { text: "¿Qué tipo de aromas prefieres en general?", options: ["Frescos y acuáticos", "Amaderados y naturales", "Cítricos y energéticos", "Intensos y misteriosos"] },
        { text: "¿Qué tanto te gustan los aromas dulces?", options: ["No me gustan nada", "Los tolero solo como nota de fondo", "Me gustan con equilibrio", "Me encantan"] },
        { text: "¿Cuál de estas notas te atrae más?", options: ["Brisa marina y frescura", "Pino o bosque", "Sándalo o madera", "Oriental o buena noche"] },
        { text: "¿Cómo prefieres la intensidad del aroma?", options: ["Suave y discreto", "Moderado y equilibrado", "Fuerte e impactante", "Suave de día, intenso de noche"] },
        { text: "¿Te molestan los aromas muy fuertes u hostigantes?", options: ["Sí, prefiero siempre discreto", "No, me gustan los que se notan", "Depende del aroma", "Solo de noche intensos"] }
    ]
};

// ==================== ESTADO ====================
let currentStep = 0; // 0 = selección género, 1-5 = universales, 6-10 = género
let gender = null;
let answers = {};

const stepContent = document.getElementById('step-content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const stepIndicator = document.getElementById('step-indicator');

// ==================== RENDERIZADO ====================
function renderStep() {
    prevBtn.style.display = 'inline-block';
    nextBtn.style.display = 'inline-block';

    if (!gender) {
        // Paso 0: Selección de género
        stepContent.innerHTML = `
            <h2>Bienvenido/a a tu perfumería personalizada</h2>
            <p style="color:#666; margin:1rem 0;">Selecciona tu género para comenzar</p>
            <div class="options-grid">
                <button class="option" data-gender="mujer">👩 Mujer</button>
                <button class="option" data-gender="hombre">👨 Hombre</button>
            </div>
        `;
        document.querySelectorAll('.option[data-gender]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                gender = e.target.dataset.gender;
                answers.gender = gender;
                currentStep = 0; // Empezamos preguntas universales
                renderStep();
            });
        });
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        stepIndicator.textContent = '';
    } else if (currentStep < 5) {
        // Preguntas universales (0-4)
        const q = universalQuestions[currentStep];
        const options = Array.isArray(q.options) ? q.options : q.options[gender];
        
        let html = `<h2>${q.text}</h2><div class="options-grid">`;
        options.forEach(opt => {
            const selected = answers[`q${currentStep + 1}`] === opt ? 'selected' : '';
            html += `<button class="option ${selected}" data-answer="${opt}">${opt}</button>`;
        });
        html += `</div>`;
        stepContent.innerHTML = html;

        document.querySelectorAll('.option[data-answer]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const answer = e.target.dataset.answer;
                answers[`q${currentStep + 1}`] = answer;
                document.querySelectorAll('.option[data-answer]').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });

        stepIndicator.textContent = `Paso ${currentStep + 1} de 10`;
    } else if (currentStep < 10) {
        // Preguntas específicas de género (5-9)
        const genderQIndex = currentStep - 5;
        const q = genderQuestions[gender][genderQIndex];
        
        let html = `<h2>${q.text}</h2><div class="options-grid">`;
        q.options.forEach(opt => {
            const selected = answers[`q${currentStep + 1}`] === opt ? 'selected' : '';
            html += `<button class="option ${selected}" data-answer="${opt}">${opt}</button>`;
        });
        html += `</div>`;
        stepContent.innerHTML = html;

        document.querySelectorAll('.option[data-answer]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const answer = e.target.dataset.answer;
                answers[`q${currentStep + 1}`] = answer;
                document.querySelectorAll('.option[data-answer]').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });

        stepIndicator.textContent = `Paso ${currentStep + 1} de 10`;
    } else {
        // Resultado final
        stepContent.innerHTML = `
            <div class="loading-spinner" id="loading">
                <div class="spinner"></div>
                <p>Creando tu muestra personalizada...</p>
            </div>
            <div id="result-container" style="display:none;"></div>
        `;
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        stepIndicator.textContent = '✨ Creando...';
        sendAnswers();
    }
}

// ==================== ENVIAR RESPUESTAS ====================
async function sendAnswers() {
    try {
        const response = await fetch('/api/create-perfume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(answers)
        });
        if (!response.ok) throw new Error('Error del servidor');
        const formula = await response.json();
        
        document.getElementById('loading').style.display = 'none';
        const resDiv = document.getElementById('result-container');
        resDiv.style.display = 'block';
        
        resDiv.innerHTML = `
            <h2>✨ Tu muestra personalizada</h2>
            <div class="perfume-card">
                <h3>${formula.name}</h3>
                <p style="color:#666; margin:1rem 0;">${formula.description}</p>
                <div class="notes-breakdown" style="background:#f9f5ff; border-radius:1rem; padding:1rem; margin:1rem 0;">
                    <strong style="color:#4a154b;">📋 Fórmula (${formula.totalDrops} gotas totales):</strong>
                    <ul style="list-style:none; padding:0.5rem 0 0 0;">
                        ${formula.notes.map(n => `<li style="padding:0.3rem 0;">🌸 <b>${n.name}</b>: ${n.drops} gotas</li>`).join('')}
                    </ul>
                </div>
                <p style="font-size:0.9rem; color:#888;">Intensidad: ${formula.intensity}</p>
                <button id="restart-btn" style="margin-top:1rem;">↩ Crear otra muestra</button>
            </div>
        `;
        
        document.getElementById('restart-btn').addEventListener('click', () => {
            gender = null;
            answers = {};
            currentStep = 0;
            renderStep();
        });
        
    } catch (err) {
        alert('Error al generar la muestra. Intenta de nuevo.');
        gender = null;
        answers = {};
        currentStep = 0;
        renderStep();
    }
}

// ==================== NAVEGACIÓN ====================
nextBtn.addEventListener('click', () => {
    if (gender && currentStep < 10) {
        if (!answers[`q${currentStep + 1}`]) {
            alert('Por favor selecciona una opción antes de continuar');
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
        renderStep();
    }
});

// ==================== INICIAR ====================
renderStep();