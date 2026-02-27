const input = document.getElementById("task-Input");
const button = document.getElementById("addButton");
const list = document.getElementById("taskList");

let tasksByDate = JSON.parse(localStorage.getItem("tasksByDate")) || {};

let currentDate = localStorage.getItem("sessionDate") 
    || new Date().toISOString().split("T")[0];

let tasks = tasksByDate[currentDate] || [];

button.addEventListener("click", addTask);

function addTask() {
    const taskText = input.value;

    if (taskText === "") return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    tasks.push(newTask);

    saveTasks(); 

    input.value = "";

    renderTasks();
}

function renderTasks() {
    list.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        span.addEventListener("click", function() {
            toggleTask(task.id);
        });


        const removeButton = document.createElement("button");
        removeButton.textContent = "❌";

        removeButton.addEventListener("click", function() {
            removeTask(task.id);
        });

        li.appendChild(span);
        li.appendChild(removeButton);

        list.appendChild(li);

       if (task.done) {
            li.classList.add("completed");
        }
        
        updateDailyProgress();
    });
}

function saveTasks() {
    tasksByDate[currentDate] = tasks;
    localStorage.setItem("tasksByDate", JSON.stringify(tasksByDate));
}


function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
    updateDailyProgress();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, done: !task.done };
        }
        return task;
    });

    saveTasks();
    renderTasks();
    updateDailyProgress();
}

renderTasks();

window.addEventListener("storage", (event) => {
    if (event.key === "sessionDate") {
        currentDate = localStorage.getItem("sessionDate");

        tasks = tasksByDate[currentDate] || [];

        renderTasks();
    }
});

function updateDailyProgress() {
    if (tasks.length === 0) {
        document.getElementById("progressBar").style.width = "0%";
        document.getElementById("progressText").textContent = "0% concluído";
        document.getElementById("productiveBadge").style.display = "none";
        return;
    }

    const done = tasks.filter(t => t.done).length;
    const percent = Math.round((done / tasks.length) * 100);

    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressText").textContent = `${percent}% concluído`;

    if (percent >= 70) {
        document.getElementById("productiveBadge").style.display = "block";
    } else {
        document.getElementById("productiveBadge").style.display = "none";
    }
}