// index.js
import { startTimer, pauseTimer, resetTimer, setTimer, getCustomDurations } from './timer.js';
import { openNavTask, closeNavTask, openNavSettings, closeNavSettings } from './SetNavBtns.js';


// Get elements from the DOM
const pomodoroBtn = document.getElementById('pomodoroBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const settingsOpenBtn = document.getElementById('settingsOpenBtn'); // Open button
const userCloseBtn = document.getElementById('userCloseBtn');
const taskOpenBtn = document.getElementById('taskOpenBtn'); // Open button
const taskCloseBtn = document.getElementById('taskCloseBtn'); // Close button


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

settingsOpenBtn.addEventListener('click', openNavSettings);
userCloseBtn.addEventListener('click', closeNavSettings);

taskOpenBtn.addEventListener('click', openNavTask);
taskCloseBtn.addEventListener('click', closeNavTask);

document.addEventListener('DOMContentLoaded', function () {
    // Your code here

    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');

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