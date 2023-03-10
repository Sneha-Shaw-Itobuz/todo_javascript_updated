const taskInput = document.getElementById("taskInput");
const container = document.getElementById("js-list");
const clearButton = document.getElementById("clearButton");
const allButton = document.getElementById("AllButton");
const incompleteButton = document.getElementById("incompleteButton");
const completedButton = document.getElementById("completedButton");
const filters = document.querySelectorAll(".filters button");

let tasks = [];
const addTask = () => {
  let task = taskInput.value;
  if (task) {
    tasks.push({ task, completed: false, id: Date.now() });
    taskInput.value = "";
    render();
  }
};

const render = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  container.innerHTML = "";
  tasks.forEach((task) => {
    let li = document.createElement("li");
    // li setAttribute to data
    li.setAttribute("data-id", task.id);
    task.completed
      ? li.classList.add("completed")
      : li.classList.remove("completed");
    li.innerHTML = `
        <span id="${task.id}">${task.task}</span>
        <button class="complete" id="${task.id}">
        <i class="fas fa-solid fa-check" ></i>
        </button>
        <button class="delete" id="${task.id}">
        <i class="fas fa-solid fa-trash" ></i>
        </button>
        `;
    container.appendChild(li);
  });
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id != id);
  render();
};

function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  render();
}

function toggleCompleted(id) {
  tasks.forEach((task) => {
    if (task.id == id) {
      task.completed = !task.completed;

      let li = document.querySelector(`[data-id="${task.id}"]`);

      // if task.completed is true, add class completed to li
      if (task.completed) {
        li.classList.add("completed");
      }
      // else remove class completed from li
      else {
        li.classList.remove("completed");
      }
    }
  });
  render();
}

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    deleteTask(e.target.id);
  } else if (e.target.classList.contains("fa-trash")) {
    deleteTask(e.target.parentElement.id);
  } else if (e.target.classList.contains("complete")) {
    toggleCompleted(e.target.id);
  } else if (e.target.classList.contains("fa-check")) {
    toggleCompleted(e.target.parentElement.id);
  }
});

clearButton.addEventListener("click", clearCompleted);

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((filter) => filter.classList.remove("active"));
    filter.classList.add("active");
  });
});

incompleteButton.addEventListener("click", () => {
  let notcompleted = document.querySelectorAll("li:not(.completed)");
  notcompleted.forEach((li) => li.classList.remove("hide"));

  let completed = document.querySelectorAll(".completed");
  completed.forEach((li) => li.classList.add("hide"));
});

completedButton.addEventListener("click", () => {
  let completed = document.querySelectorAll(".completed");
  completed.forEach((li) => li.classList.remove("hide"));

  let remaining = document.querySelectorAll("li:not(.completed)");
  remaining.forEach((li) => li.classList.add("hide"));
});

allButton.addEventListener("click", () => {
  let completed = document.querySelectorAll(".completed");
  completed.forEach((li) => li.classList.remove("hide"));

  let remaining = document.querySelectorAll("li:not(.completed)");
  remaining.forEach((li) => li.classList.remove("hide"));
});

taskInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    addTask();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("tasks");
  console.log(ref);
  if (ref) {
    tasks = JSON.parse(ref);
    render();
  }
});
