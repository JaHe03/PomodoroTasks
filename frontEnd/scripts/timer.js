// timer.js

let timer;  // Variable to store the timer
let isRunning = false;  // Flag to check if the timer is running
let timeLeft; // Remaining time in seconds
let sessionCount = 0;   // Count completed sessions
let lastDuration = 25 * 60; // Default Pomodoro time in seconds


// Get elements from the DOM
const timeDisplay = document.getElementById('time');
const sessionCountDisplay = document.getElementById('sessionCount');

// Function to format time in mm:ss
function formatTime(seconds) {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
}

// Function to start the timer
function startTimer() {
    if (isRunning) return;  // Prevent starting multiple timers

    isRunning = true;

    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = formatTime(timeLeft);

        if (timeLeft === 0) {
            clearInterval(timer);
            isRunning = false;
            sessionCount++;
            sessionCountDisplay.textContent = sessionCount;

            nextSession();
        }
    }, 1000);
}

// Function to pause the timer
function pauseTimer() {
    if (!isRunning) return;
    clearInterval(timer);
    isRunning = false;
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft =  lastDuration// Reset to default Pomodoro time
    timeDisplay.textContent = formatTime(timeLeft);
    startTimer();
}

// Function to set timer duration based on button clicked
function setTimer(duration) {
    clearInterval(timer);
    isRunning = false;
    lastDuration = duration * 60; // Save the last duration
    timeLeft = lastDuration; // Convert minutes to seconds
    timeDisplay.textContent = formatTime(timeLeft);
}

// Function to get custom durations from input fields
function getCustomDurations() {
    const pomodoroLength = parseInt(document.getElementById('pomodoroLength').value, 10) || 25; // Default to 25 if empty
    const shortBreakLength = parseInt(document.getElementById('breakLength').value, 10) || 5; // Default to 5 if empty
    const longBreakLength = parseInt(document.getElementById('longBreakLength').value, 10) || 15; // Default to 15 if empty
    

    return {
        pomodoro: pomodoroLength,
        shortBreak: shortBreakLength,
        longBreak: longBreakLength
    };
}

function nextSession() {
    if (sessionCount % 4 === 0) {
        setTimer(getCustomDurations().longBreak);
    } else {
        setTimer(getCustomDurations().shortBreak);
    }
    startTimer();
}

// Expose functions to the global scope for use in index.js
export { startTimer, pauseTimer, resetTimer, setTimer, getCustomDurations, nextSession };
