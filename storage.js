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