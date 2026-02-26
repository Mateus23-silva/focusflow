function saveSettings(workTime, breakTime) {
    const settings = {
        workTime: workTime,
        breakTime: breakTime
    };

    localStorage.setItem("pomodoroSettings", JSON.stringify(settings));
}

function loadSettings() {
    const saved = localStorage.getItem("pomodoroSettings");

    if (!saved) return null;

    return JSON.parse(saved);
}

function saveSessionCount(date = null) {
    const today = new Date().toISOString().split("T")[0];

    const data = {
        date: date || today,
        count: completedSessions
    };

    localStorage.setItem("sessionData", JSON.stringify(data));
}

function loadSessionCount() {
    const saved = localStorage.getItem("sessionData");

    const today = new Date().toISOString().split("T")[0];

    if (!saved) {
        // cria estrutura inicial
        const newData = { date: today, count: 0 };
        localStorage.setItem("sessionData", JSON.stringify(newData));
        return 0;
    }

    const data = JSON.parse(saved);

    if (data.date !== today) {
        // virou o dia → reseta e atualiza storage
        const newData = { date: today, count: 0 };
        localStorage.setItem("sessionData", JSON.stringify(newData));
        return 0;
    }

    return data.count;
}