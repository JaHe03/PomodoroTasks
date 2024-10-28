// timer.js

let timer;  // Variable to store the timer
let isRunning = false;  // Flag to check if the timer is running
let timeLeft; // Remaining time in seconds
let sessionCount = 0;   // Count completed sessions
let lastDuration = 25 * 60; // Default Pomodoro time in seconds
let isPomodoro = true; // Track if the current session is a break or Pomodoro

// Get elements from the DOM
const timeDisplay = document.getElementById('time');
const sessionCountDisplay = document.getElementById('sessionCount');
const sessionMessage = document.getElementById('sessionMessage'); // New element

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

            if (isPomodoro) {
                sessionCount++;
                sessionCountDisplay.textContent = sessionCount;
            }
            nextSession();
        }
    }, 1000); // Ensure the timer runs every second
}

// Function to pause the timer
function pauseTimer() {
    if(pauseBtn.textContent === 'Pause') {
        clearInterval(timer);  // Stop the timer
        isRunning = false;     // Set running flag to false
        pauseBtn.textContent = 'Resume'; // Change button text to 'Resume'
    } else {
        startTimer();  // Resume the timer
        pauseBtn.textContent = 'Pause'; // Change button text to 'Pause'
    }
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timer);   // Stop the timer
    isRunning = false;      // Set running flag to false
    timeLeft = lastDuration;  // Reset the timeLeft to the original duration
    timeDisplay.textContent = formatTime(timeLeft);  // Display the reset time
    sessionMessage.textContent = "Time to work."; // Reset message
}

// Function to set timer duration based on button clicked
function setTimer(duration) {
    clearInterval(timer);  // Stop any running timer
    isRunning = false;     // Mark timer as not running
    lastDuration = duration;  // Update the last duration to the new duration (in seconds)
    timeLeft = lastDuration;  // Set timeLeft to the new duration
    timeDisplay.textContent = formatTime(timeLeft);  // Display the correct formatted time
}

// Function to get custom durations from input fields
function getCustomDurations() {
    const pomodoroMinutes = parseInt(document.getElementById('pomodoroMinutes').value, 10) || 0;
    const pomodoroSeconds = parseInt(document.getElementById('pomodoroSeconds').value, 10) || 0;

    const shortBreakMinutes = parseInt(document.getElementById('breakMinutes').value, 10) || 0;
    const shortBreakSeconds = parseInt(document.getElementById('breakSeconds').value, 10) || 0;

    const longBreakMinutes = parseInt(document.getElementById('longBreakMinutes').value, 10) || 0;
    const longBreakSeconds = parseInt(document.getElementById('longBreakSeconds').value, 10) || 0;

    const longBreakInterval = parseInt(document.getElementById('longBreakInterval').value, 10) || 4;

    return {
        pomodoro: (pomodoroMinutes * 60) + pomodoroSeconds, // Convert to total seconds
        shortBreak: (shortBreakMinutes * 60) + shortBreakSeconds,
        longBreak: (longBreakMinutes * 60) + longBreakSeconds,
        longBreakInterval: longBreakInterval
    };
}

function nextSession() {
    // Toggle between Pomodoro and break sessions
    const customDurations = getCustomDurations();

    if (isPomodoro) {
        // If the current session was Pomodoro, switch to break
        if (sessionCount % customDurations.longBreakInterval === 0) {
            setTimer(customDurations.longBreak);  // Long break after X Pomodoro sessions
            sessionMessage.textContent = "Get up and stretch and drink some water"; // Update message
        } else {
            setTimer(customDurations.shortBreak);  // Short break otherwise
            sessionMessage.textContent = "Get up and stretch and drink some water"; // Update message
        }
        isPomodoro = false;  // Next session will be a break
    } else {
        // If the current session was a break, switch to Pomodoro
        setTimer(customDurations.pomodoro);  // Start new Pomodoro
        sessionMessage.textContent = "Time to work."; // Update message for Pomodoro
        isPomodoro = true;  // Next session will be Pomodoro
    }

    startTimer();  // Automatically start the next session
}

// Expose functions to the global scope for use in index.js
export { startTimer, pauseTimer, resetTimer, setTimer, getCustomDurations, nextSession };
