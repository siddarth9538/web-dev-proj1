document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskTitle = document.getElementById("taskInput").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskPriority = document.getElementById("taskPriority").value;

    if (!taskTitle.trim()) {
        alert("Task title cannot be empty.");
        return;
    }

    const task = {
        title: taskTitle,
        description: taskDescription,
        priority: taskPriority,
        status: "Pending"
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("taskInput").value = "";
    document.getElementById("taskDescription").value = "";
    loadTasks();
}

function loadTasks() {
    const taskTableBody = document.querySelector("#taskTable tbody");
    taskTableBody.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="py-2 px-4">${task.title}</td>
            <td class="py-2 px-4">${task.description}</td>
            <td class="py-2 px-4">
                <select class="bg-[#00eaff] text-black font-bold px-2 py-1 rounded-md focus:outline-none" onchange="updatePriority(${index}, this.value)">
                    <option value="1" ${task.priority == 1 ? "selected" : ""}>1 (Low)</option>
                    <option value="2" ${task.priority == 2 ? "selected" : ""}>2 (Medium)</option>
                    <option value="3" ${task.priority == 3 ? "selected" : ""}>3 (High)</option>
                    <option value="4" ${task.priority == 4 ? "selected" : ""}>4 (Urgent)</option>
                </select>
            </td>
            <td class="py-2 px-4 font-semibold ${task.status === "Completed" ? "text-green-400" : "text-yellow-400"}">
                ${task.status}
            </td>
            <td class="py-2 px-4">
                <button onclick="toggleComplete(${index})" class="text-green-400 font-bold px-2 py-1">
                    ${task.status === "Completed" ? "🔄" : "✔"}
                </button>
                <button onclick="deleteTask(${index})" class="text-red-400 font-bold px-2 py-1">✖</button>
            </td>
        `;
        taskTableBody.appendChild(row);
    });

    document.getElementById("numTasks").innerText = tasks.length;
    document.getElementById("numCompleted").innerText = tasks.filter(t => t.status === "Completed").length;
}

function updatePriority(index, newPriority) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].priority = newPriority;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].status = tasks[index].status === "Completed" ? "Pending" : "Completed";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
