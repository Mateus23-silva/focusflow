const input = document.getElementById("task-Input");
const button = document.getElementById("addButton");
const list = document.getElementById("taskList");

let tasks = [];

button.addEventListener("click", addTask);

function addTask() {
    const taskText = input.value;

    if (taskText === "") return;

    tasks.push(taskText);

    input.value = "";

    renderTasks();
}

function renderTasks() {
    list.innerHTML = "";

    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.textContent = task;

        list.appendChild(li);
    })
}