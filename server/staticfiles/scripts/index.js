// index.js
import { startTimer, pauseTimer, resetTimer, setTimer, getCustomDurations } from './timer.js';
import { addTask } from './tasks.js';
import { setTheme } from './themes.js';
import { openNavTask, closeNavTask, openNavSettings, closeNavSettings } from './SetNavBtns.js';



// Get elements from the DOM
const pomodoroBtn = document.getElementById('pomodoroBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const taskForm = document.getElementById('taskForm');
const settingsOpenBtn = document.getElementById('settingsOpenBtn'); // Open button
const userCloseBtn = document.getElementById('userCloseBtn');
const taskOpenBtn = document.getElementById('taskOpenBtn'); // Open button
const taskCloseBtn = document.getElementById('taskCloseBtn'); // Close button
const lightModeBtn = document.getElementById('lightModeBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const defaultModeBtn = document.getElementById('defaultModeBtn');

// Event listeners for theme buttons
lightModeBtn.addEventListener('click', () => {
    setTheme('light');
});

darkModeBtn.addEventListener('click', () => {
    setTheme('dark');
});

defaultModeBtn.addEventListener('click', () => {
    setTheme('default');
});

// Event listeners for buttons
pomodoroBtn.addEventListener('click', () => {
    const durations = getCustomDurations();
    setTimer(durations.pomodoro); // Use custom or default Pomodoro length
    startTimer(); // Start the timer
    }
);

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

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask(taskList, taskInput);
});

settingsOpenBtn.addEventListener('click', openNavSettings);
userCloseBtn.addEventListener('click', closeNavSettings);

taskOpenBtn.addEventListener('click', openNavTask);
taskCloseBtn.addEventListener('click', closeNavTask);

document.addEventListener('DOMContentLoaded', function () {
    // Your code here
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const saveBtn = document.getElementById('saveBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = "/login";
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            window.location.href = "/signup";
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default behavior of the button
            
            // Ensure the logout form exists
            const logoutForm = document.getElementById("logoutForm");
            
            // Check if logoutForm is not null
            if (logoutForm) {
                // Submit the form using JavaScript
                logoutForm.submit();
            } else {
                console.error('Logout form not found');
            }
        });
    }
});