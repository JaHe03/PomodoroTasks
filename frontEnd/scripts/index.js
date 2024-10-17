// index.js
import { startTimer, pauseTimer, resetTimer, setTimer, getCustomDurations } from './timer.js';
import { setTheme } from './themes.js';
import { addTask } from './tasks.js';

// Get elements from the DOM
const pomodoroBtn = document.getElementById('pomodoroBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lightModeBtn = document.getElementById('lightModeBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const defaultModeBtn = document.getElementById('defaultModeBtn');
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const taskForm = document.getElementById('taskForm');
const deleteTaskBtn = document.getElementById('deleteTaskBtn');
const moveUpTaskBtn = document.getElementById('moveUpTaskBtn');
const moveDownTaskBtn = document.getElementById('moveDownTaskBtn');


// Event listeners for buttons
pomodoroBtn.addEventListener('click', () => {
    const durations = getCustomDurations();
    setTimer(durations.pomodoro); // Use custom or default Pomodoro length
    startTimer(); // Start the timer
});

shortBreakBtn.addEventListener('click', () => {
    const durations = getCustomDurations();
    setTimer(durations.shortBreak); // Use custom or default short break length
    startTimer(); // Start the timer
});

longBreakBtn.addEventListener('click', () => {
    const durations = getCustomDurations();
    setTimer(durations.longBreak); // Use custom or default long break length
    startTimer(); // Start the timer
});

pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize the display
document.getElementById('time').textContent = '25:00'; // Initial time display

lightModeBtn.addEventListener('click', () => setTheme('light'));
darkModeBtn.addEventListener('click', () => setTheme('dark'));
defaultModeBtn.addEventListener('click', () => setTheme('default'));

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask(taskList, taskInput);
});
