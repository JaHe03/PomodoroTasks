// Function to create a new task element using the template
function createTaskElement(taskText) {
    // Get the task template from the HTML file
    const template = document.getElementById('taskTemplate');
    
    // Clone the template's content to create a new task
    const taskItem = template.content.cloneNode(true);
    
    // Set the task text
    const taskSpan = taskItem.querySelector('.taskText');
    taskSpan.textContent = taskText;
    
    // Attach event listeners to buttons within the cloned template
    const deleteBtn = taskItem.querySelector('.deleteTaskBtn');
    const moveUpBtn = taskItem.querySelector('.moveUpTaskBtn');
    const moveDownBtn = taskItem.querySelector('.moveDownTaskBtn');

    deleteBtn.addEventListener('click', () => {
        const li = deleteBtn.closest('li');
        li.remove(); // Remove the task element
    });

    moveUpBtn.addEventListener('click', () => {
        const li = moveUpBtn.closest('li');
        const prevTask = li.previousElementSibling;
        if (prevTask) {
            li.parentNode.insertBefore(li, prevTask); // Move task up
        }
    });

    moveDownBtn.addEventListener('click', () => {
        const li = moveDownBtn.closest('li');
        const nextTask = li.nextElementSibling;
        if (nextTask) {
            li.parentNode.insertBefore(nextTask, li); // Move task down
        }
    });

    return taskItem; // Return the cloned task element
}

// Function to add a new task
function addTask(taskList, taskInput) {
    const taskText = taskInput.value.trim(); // Get the input value

    if (taskText !== '') {
        // Create a task element using the template
        const taskItem = createTaskElement(taskText);

        // Append the task element to the task list
        taskList.appendChild(taskItem);

        // Clear the input field after adding the task
        taskInput.value = '';
    }
}

export { addTask };
