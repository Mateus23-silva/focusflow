const input = document.getElementById("task-Input");
const button = document.getElementById("addButton");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.5";
        }

    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
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
}


renderTasks();