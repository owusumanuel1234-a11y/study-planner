// ---------- Setup ----------
const STORAGE_KEY = "studyPlannerTasks";

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const courseInput = document.getElementById("task-course");
const dueInput = document.getElementById("task-due");
const errorMessage = document.getElementById("error-message");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const taskCounter = document.getElementById("task-counter");

let tasks = loadTasks();

// ---------- Saving and loading (localStorage) ----------
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ---------- Date helpers ----------
function todayString() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

function formatDate(dateString) {
  const [y, m, d] = dateString.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ---------- Show tasks on the page ----------
function render() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const isOverdue = task.due && task.due < todayString() && !task.completed;

    const li = document.createElement("li");
    li.className = "task";
    if (task.completed) li.classList.add("completed");
    if (isOverdue) li.classList.add("overdue");

    // Left side: checkbox + title + details
    const main = document.createElement("div");
    main.className = "task-main";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Mark task complete");
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const info = document.createElement("div");
    const title = document.createElement("p");
    title.className = "task-title";
    title.textContent = task.title;

    const meta = document.createElement("div");
    meta.className = "task-meta";

    if (task.course) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = task.course;
      meta.appendChild(tag);
    }
    if (task.due) {
      const due = document.createElement("span");
      due.textContent = "Due: " + formatDate(task.due);
      meta.appendChild(due);
    }
    if (isOverdue) {
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = "Overdue";
      meta.appendChild(badge);
    }

    info.append(title, meta);
    main.append(checkbox, info);

    // Right side: buttons
    const actions = document.createElement("div");
    actions.className = "task-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "btn-toggle";
    toggleBtn.textContent = task.completed ? "Undo" : "Complete";
    toggleBtn.addEventListener("click", () => toggleTask(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    actions.append(toggleBtn, deleteBtn);
    li.append(main, actions);
    taskList.appendChild(li);
  });

  // Empty-state message and counter
  emptyMessage.hidden = tasks.length > 0;
  const doneCount = tasks.filter((t) => t.completed).length;
  taskCounter.textContent = `${doneCount} of ${tasks.length} complete`;
}

// ---------- Actions ----------
function addTask(title, course, due) {
  tasks.push({
    id: Date.now(),
    title: title,
    course: course,
    due: due,
    completed: false,
  });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) task.completed = !task.completed;
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

// ---------- Form handling and validation ----------
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading

  const title = titleInput.value.trim();

  if (title === "") {
    errorMessage.hidden = false;
    titleInput.classList.add("invalid");
    titleInput.focus();
    return; // stop here, do not add the task
  }

  addTask(title, courseInput.value.trim(), dueInput.value);

  form.reset();
  errorMessage.hidden = true;
  titleInput.classList.remove("invalid");
});

// Hide the error as soon as the user starts typing
titleInput.addEventListener("input", () => {
  errorMessage.hidden = true;
  titleInput.classList.remove("invalid");
});

// ---------- Start ----------
render();