import { startTimer, pauseTimer, resetTimer, updateTimerValues } from './timer.js';

// Add event listeners for timer buttons
document.getElementById('pomodoroBtn').addEventListener('click', () => {
    startTimer(25 * 60); // Start Pomodoro timer for 25 minutes
});

document.getElementById('shortBreakBtn').addEventListener('click', () => {
    startTimer(5 * 60); // Start Short Break timer for 5 minutes
});

document.getElementById('longBreakBtn').addEventListener('click', () => {
    startTimer(15 * 60); // Start Long Break timer for 15 minutes
});

// Optionally, add listeners for pause and reset buttons
document.getElementById('pauseBtn').addEventListener('click', () => {
    pauseTimer(); // Call pauseTimer function
});

document.getElementById('resetBtn').addEventListener('click', () => {
    resetTimer(); // Call resetTimer function
});
