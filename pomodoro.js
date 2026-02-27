// Tempo padrão (em minutos)
let workTime = 5;   // foco
let breakTime = 3;  // pausa

let currentMode = "work";
let currentTime = workTime * 60;

let timerRunning = false;
let timerInterval = null;

let completedSessions = 0;

// ================================
// PROGRESS RING
// ================================

let circle;
let circumference;

function initProgressRing() {
    circle = document.querySelector(".progress-ring-circle");

    if (!circle) return;

    const radius = circle.r.baseVal.value;
    circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
}

function updateProgress(timeLeft, totalTime) {
    if (!circle) return;

    const progress = timeLeft / totalTime;
    const offset = circumference - progress * circumference;
    circle.style.strokeDashoffset = offset;
}

// ================================
// DISPLAY
// ================================

function updateDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;

    document.getElementById("timer").textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    document.getElementById("modeLabel").textContent =
        currentMode === "work" ? "Modo: Foco" : "Modo: Pausa";
}

// ================================
// TIMER
// ================================

function startTimer() {
    if (timerRunning) return;

    timerRunning = true;

    timerInterval = setInterval(() => {
        currentTime--;

        const totalTime =
            currentMode === "work" ? workTime * 60 : breakTime * 60;

        updateDisplay();
        updateProgress(currentTime, totalTime);

        if (currentTime <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;
            switchMode();
            startTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;

    currentMode = "work";
    currentTime = workTime * 60;

    updateDisplay();
    updateProgress(currentTime, workTime * 60);
    updateTheme();
}

// ================================
// TROCA DE MODO
// ================================

function switchMode() {
    if (currentMode === "work") {
        completedSessions++;
        updateSessionCounter();
        saveSessionCount();

        currentMode = "break";
        currentTime = breakTime * 60;
        alert("Hora da pausa!");
    } else {
        currentMode = "work";
        currentTime = workTime * 60;
        alert("Hora de focar!");
    }

    updateDisplay();
    updateTheme();
}

// ================================
// CONTADOR DE SESSÕES
// ================================

function updateSessionCounter() {
    document.getElementById("sessionCounter").textContent =
        `Sessões concluídas: ${completedSessions}`;
}

// ================================
// CONFIGURAÇÕES PERSONALIZADAS
// ================================

function applySettings() {
    if (timerRunning) {
        alert("Pause o timer antes de alterar o tempo.");
        return;
    }

    const workMinutes = document.getElementById("workInput").value;
    const breakMinutes = document.getElementById("breakInput").value;

    workTime = Number(workMinutes);
    breakTime = Number(breakMinutes);

    currentTime = workTime * 60;

    saveSettings(workTime * 60, breakTime * 60);

    updateDisplay();
    updateProgress(currentTime, workTime * 60);
}

// ================================
// TEMA
// ================================

function updateTheme() {
    document.body.classList.remove("work-mode", "break-mode");

    if (currentMode === "work") {
        document.body.classList.add("work-mode");
    } else {
        document.body.classList.add("break-mode");
    }
}

// ================================
// AO CARREGAR A PÁGINA
// ================================

document.addEventListener("DOMContentLoaded", () => {
    initProgressRing();

    const settings = loadSettings();

    if (settings) {
        workTime = settings.workTime / 60;
        breakTime = settings.breakTime / 60;
    }

    completedSessions = loadSessionCount();
    updateSessionCounter();

    currentTime = workTime * 60;

    updateDisplay();
    updateProgress(currentTime, workTime * 60);
    updateTheme();
});