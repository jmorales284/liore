document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const stepIndicator = document.getElementById('step-indicator');
    let currentStep = 0;

    // Almacenamiento de respuestas
    const answers = {
        personality: null,
        season: null,
        families: {},
        dislikes: [],
        intensity: 'moderada',
        occasion: null
    };

    // Cargar notas disponibles para "dislikes"
    fetch('/api/create-perfume', { 
        method: 'POST', 
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify({}) 
    }).catch(()=>{}); // solo para activar caché del servidor; cargamos aromas manualmente

    // Podemos hacer fetch a un endpoint de aromas, pero como no lo tenemos, llenaremos dislikes con algunos comunes.
    const commonDislikes = ['Pachulí', 'Rosa', 'Incienso', 'Coco', 'Almizcle blanco', 'Jazmín', 'Vainilla'];
    const dislikeContainer = document.getElementById('dislike-options');
    commonDislikes.forEach(note => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.textContent = note;
        btn.dataset.value = note;
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
            updateDislikes();
        });
        dislikeContainer.appendChild(btn);
    });

    function updateDislikes() {
        const selected = document.querySelectorAll('#dislike-options .option.selected');
        answers.dislikes = Array.from(selected).map(el => el.dataset.value);
    }

    // Selección de opciones normales
    document.querySelectorAll('.option').forEach(btn => {
        if (btn.closest('#dislike-options')) return; // ya manejado
        btn.addEventListener('click', function(e) {
            // Identificar el step actual
            const stepDiv = e.target.closest('.step');
            if (!stepDiv) return;
            const stepId = parseInt(stepDiv.dataset.step);
            // Si es un step de selección única, desmarcar otros
            if (stepId === 0 || stepId === 1 || stepId === 4 || stepId === 5) {
                const siblings = stepDiv.querySelectorAll('.option');
                siblings.forEach(s => s.classList.remove('selected'));
                e.target.classList.add('selected');
                // Guardar valor
                const value = e.target.dataset.value;
                if (stepId === 0) answers.personality = value;
                else if (stepId === 1) answers.season = value;
                else if (stepId === 4) answers.intensity = value;
                else if (stepId === 5) answers.occasion = value;
            }
            validateNext();
        });
    });

    // Sliders de familias
    document.querySelectorAll('#families-rating input[type=range]').forEach(input => {
        input.addEventListener('input', () => {
            answers.families[input.dataset.family] = parseInt(input.value);
        });
    });

    // Inicializar sliders con valor 3
    document.querySelectorAll('#families-rating input[type=range]').forEach(input => {
        answers.families[input.dataset.family] = 3;
    });

    function validateNext() {
        let canAdvance = false;
        switch(currentStep) {
            case 0: canAdvance = answers.personality !== null; break;
            case 1: canAdvance = answers.season !== null; break;
            case 2: canAdvance = true; break; // familias ya tienen default
            case 3: canAdvance = true; break; // opcional
            case 4: canAdvance = answers.intensity !== null; break;
            case 5: canAdvance = answers.occasion !== null; break;
            case 6: canAdvance = false; break;
        }
        nextBtn.disabled = !canAdvance && currentStep < 6;
        prevBtn.disabled = currentStep === 0;
    }

    function showStep(stepIndex) {
        steps.forEach(s => s.classList.remove('active'));
        steps[stepIndex].classList.add('active');
        stepIndicator.textContent = `Paso ${stepIndex+1}/${steps.length-1}`;
        validateNext();
    }

    nextBtn.addEventListener('click', async () => {
        if (currentStep < 5) {
            currentStep++;
            showStep(currentStep);
        } else if (currentStep === 5) {
            // Ir al paso de resultado (carga)
            currentStep = 6;
            showStep(currentStep);
            document.getElementById('loading').style.display = 'block';
            document.getElementById('result-container').style.display = 'none';
            nextBtn.style.display = 'none';
            prevBtn.style.display = 'none';
            stepIndicator.textContent = 'Generando...';

            try {
                const response = await fetch('/api/create-perfume', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(answers)
                });
                if (!response.ok) throw new Error('Error del servidor');
                const formula = await response.json();
                displayResult(formula);
            } catch (error) {
                alert('Ocurrió un error al crear el perfume. Intenta de nuevo.');
                currentStep = 5;
                showStep(currentStep);
                nextBtn.style.display = 'inline-block';
                prevBtn.style.display = 'inline-block';
            }
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            if (currentStep === 6) {
                // Volver de resultado: ocultamos carga y mostramos navegación
                document.getElementById('loading').style.display = 'none';
                document.getElementById('result-container').style.display = 'none';
                nextBtn.style.display = 'inline-block';
                prevBtn.style.display = 'inline-block';
                currentStep = 5;
            } else {
                currentStep--;
            }
            showStep(currentStep);
        }
    });

    function displayResult(formula) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
        document.getElementById('perfume-name').textContent = formula.name;
        document.getElementById('perfume-desc').textContent = formula.description;

        const topNotes = formula.notes.top ? formula.notes.top.map(n => `${n.name} (${n.percentage}%)`).join(', ') : '-';
        const heartNotes = formula.notes.heart ? formula.notes.heart.map(n => `${n.name} (${n.percentage}%)`).join(', ') : '-';
        const baseNotes = formula.notes.base ? formula.notes.base.map(n => `${n.name} (${n.percentage}%)`).join(', ') : '-';

        document.getElementById('top-notes').textContent = topNotes;
        document.getElementById('heart-notes').textContent = heartNotes;
        document.getElementById('base-notes').textContent = baseNotes;

        prevBtn.style.display = 'inline-block';
        stepIndicator.textContent = 'Tu perfume está listo';
        prevBtn.disabled = false;
    }

    document.getElementById('refine-btn').addEventListener('click', () => {
        // Volver al paso anterior para editar
        document.getElementById('loading').style.display = 'none';
        document.getElementById('result-container').style.display = 'none';
        nextBtn.style.display = 'inline-block';
        prevBtn.style.display = 'inline-block';
        currentStep = 0;
        showStep(currentStep);
    });

    // Inicializar
    showStep(0);
});