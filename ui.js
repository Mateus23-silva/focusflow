const sessionDate = document.getElementById("sessionDate");

window.addEventListener("load", () => {
    const savedDate = localStorage.getItem("sessionDate");

    if (savedDate) {
        sessionDate.value = savedDate;
    } else {
        const today = new Date().toISOString().split("T")[0];
        sessionDate.value = today;
        localStorage.setItem("sessionDate", today);
    }
});

function toggleMusic() {
    const container = document.getElementById("musicContainer");

    if (container.style.display === "none") {
        container.style.display = "block";
    } else {
        container.style.display = "none";
    }
}

sessionDate.addEventListener("change", () => {
    localStorage.setItem("sessionDate", sessionDate.value);
});