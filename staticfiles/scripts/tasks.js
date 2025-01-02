function createTaskElement(taskText) {
    const template = document.getElementById('taskTemplate');
    const taskItem = template.content.cloneNode(true);

    const taskSpan = taskItem.querySelector('.taskText');
    taskSpan.textContent = taskText;

    const deleteBtn = taskItem.querySelector('.deleteTaskBtn');
    const moveUpBtn = taskItem.querySelector('.moveUpTaskBtn');
    const moveDownBtn = taskItem.querySelector('.moveDownTaskBtn');

    deleteBtn.addEventListener('click', () => {
        const li = deleteBtn.closest('li');
        li.remove();
        saveTasksToLocalStorage();
    });

    moveUpBtn.addEventListener('click', () => {
        const li = moveUpBtn.closest('li');
        const prevTask = li.previousElementSibling;
        if (prevTask) {
            li.parentNode.insertBefore(li, prevTask);
            saveTasksToLocalStorage();
        }
    });

    moveDownBtn.addEventListener('click', () => {
        const li = moveDownBtn.closest('li');
        const nextTask = li.nextElementSibling;
        if (nextTask) {
            li.parentNode.insertBefore(nextTask, li);
            saveTasksToLocalStorage();
        }
    });

    return taskItem;
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.taskText').forEach(taskText => {
        tasks.push(taskText.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
    });
}

function addTask(taskInput) {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskList = document.getElementById('taskList');
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        saveTasksToLocalStorage();
        taskInput.value = ''; // Clear the input field
    }
}

// Initialization function to attach event listener
function initializeTaskForm() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    if (taskForm && taskInput) {
        taskForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission behavior
            addTask(taskInput);
        });
    }
}

// Call the functions immediately when the script is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage();
    initializeTaskForm();
});
