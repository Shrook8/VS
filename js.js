let tasks = [];
// Function to render the task list
function renderTaskList() {
  const taskList = document.getElementById("task-list");
  taskList.textContent = "";
  tasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.textContent = task.text;
    const deleteButton = document.createElement("span");
    deleteButton.textContent = "x";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", () => {
      deleteTask(index);
    });
    taskElement.appendChild(deleteButton);
    taskList.appendChild(taskElement);
  });
}

// Function to add a new task
function addTask() {
  const newTaskInput = document.getElementById("new-task-input");
  const newTask = newTaskInput.value.trim();
  if (newTask != "") {
    tasks.push({ text: newTask });
    newTaskInput.value = "";
    renderTaskList();
    showPopup("To do added!", "success");
    saveTasksToLocalStorage();
  } else {
    showPopup("Please fill in to do field", "error");
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTaskList();
  showPopup("To do deleted!", "success");
  saveTasksToLocalStorage();
}

// Function to show a popup message
function showPopup(message, type) {
  const popup = document.createElement("div");
  popup.className = `popup ${type}`;
  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.classList.add("show");
  }, 0);
  setTimeout(() => {
    popup.remove();
  }, 2000);
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTaskList();
  }
}

// Add event listener to the add task button
document.getElementById("add-task-btn").addEventListener("click", addTask);

// Add event listener to the new task input to add task on enter
document.getElementById("new-task-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Load tasks from local storage
loadTasksFromLocalStorage();
