function toggleMusic() {
    const container = document.getElementById("musicContainer");

    if (container.style.display === "none") {
        container.style.display = "block";
    } else {
        container.style.display = "none";
    }
}