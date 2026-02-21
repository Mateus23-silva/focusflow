// Tempo padrão (25 minutos em segundos)
let workTime = 10 ;

// Tempo de pausa (5 minutos)
let breakTime = 5 ;

// Tempo atual que está sendo contado
let currentTime = workTime;

// Controla se está rodando ou não
let timerRunning = false;

// Guarda o intervalo do setInterval
let timerInterval = null;

let currentMode = "work"; 

function applySettings() {
    const workMinutes = document.getElementById("workInput").value;
    const breakMinutes = document.getElementById("breakInput").value;

    if (timerRunning) {
        alert("Pause o timer antes de alterar o tempo.");
        return;
    }

    workTime = workMinutes * 60;
    breakTime = breakMinutes * 60;

    if (currentMode === "work") {
        currentTime = workTime;
    } else {
        currentTime = breakTime;
    }

    saveSettings(workTime, breakTime);

    updateDisplay();
}

function switchMode() {
    if (currentMode === "work") {
        currentMode = "break";
        currentTime = breakTime;
        alert("Hora da pausa!");
    } else {
        currentMode = "work";
        currentTime = workTime;
        alert("Hora de focar!");
    }

    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;

    document.getElementById("timer").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    document.getElementById("modeLabel").textContent = currentMode === "work" ? "Modo: Foco" : "Modo: Pausa";
}

function startTimer() {
    if (timerRunning) return;

    timerRunning = true;

    timerInterval = setInterval(() => {
        currentTime--;

        updateDisplay();

       if (currentTime <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;

            switchMode();   // troca automaticamente
            startTimer();   // reinicia já no novo modo
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
    currentTime = workTime;
    updateDisplay();
}

updateDisplay();

window.addEventListener("load", () => {
    const settings = loadSettings();

    if (settings) {
        workTime = settings.workTime;
        breakTime = settings.breakTime;

        currentTime = workTime;
        updateDisplay();

        // Atualiza os inputs visuais
        document.getElementById("workInput").value = workTime / 60;
        document.getElementById("breakInput").value = breakTime / 60;
    }
});