// script.js
let tasks = [];

function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, done: false });
  input.value = "";
  updateTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  updateTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasks();
}

function updateTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");
    li.innerHTML = `
      ${task.text}
      <div class="actions">
        <button onclick="toggleTask(${index})">${task.done ? "✔️" : "⭕"}</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    list.appendChild(li);
  });

  const doneCount = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const percent = total ? (doneCount / total) * 100 : 0;

  document.getElementById("progress-fill").style.width = percent + "%";
  document.getElementById("progress-count").innerText = `${doneCount} / ${total}`;
}
