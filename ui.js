document.addEventListener("DOMContentLoaded", () => {

const sessionDate = document.getElementById("sessionDate");

if (!sessionDate) return;

// 🔹 Verifica se já existe uma data salva
const savedDate = localStorage.getItem("sessionDate");

if (savedDate) {
    sessionDate.value = savedDate;
} else {
    // 🔹 Se não existir, usa a data de hoje
    const today = new Date().toISOString().split("T")[0];
    sessionDate.value = today;
    localStorage.setItem("sessionDate", today);
}

// 🔹 Sempre que o usuário mudar a data, salva automaticamente
sessionDate.addEventListener("change", () => {
    localStorage.setItem("sessionDate", sessionDate.value);

    // força atualização imediata das tarefas
    window.dispatchEvent(new Event("storage"));
});


});

function toggleMusic() {
const container = document.getElementById("musicContainer");


if (!container) return;

container.style.display =
    container.style.display === "none" ? "block" : "none";


}
