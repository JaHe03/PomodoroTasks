let timerInterval;
let remainingTime = 1500; // 25 minutes in seconds (default Pomodoro length)
let isPaused = true;
let sessionCount = 0;

// Function to update the time display
function updateDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timeElement = document.getElementById('time');
    timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Start the countdown
function startTimer(duration) {
    remainingTime = duration; // Set remainingTime to the duration passed
    isPaused = false; // Set isPaused to false
    clearInterval(timerInterval); // Clear any existing intervals

    timerInterval = setInterval(() => {
        if (!isPaused && remainingTime > 0) {
            remainingTime--; // Decrease remainingTime by 1
            updateDisplay(remainingTime); // Update the display
        } else if (remainingTime === 0) {
            clearInterval(timerInterval); // Stop the timer when it reaches 0
            sessionCount++;
            document.getElementById('sessionCount').textContent = sessionCount; // Increment session count
        }
    }, 1000); // Set the interval to 1 second
}


// Pause the timer
function pauseTimer() {
    isPaused = true;
}

// Reset the timer
function resetTimer(defaultTime) {
    clearInterval(timerInterval);
    remainingTime = defaultTime;
    isPaused = true;
    updateDisplay(remainingTime);
}

// Update the timer based on user input from settings sidebar
function updateTimerValues(pomodoroLength, shortBreakLength, longBreakLength) {
    const modeButtons = document.querySelectorAll('.userSelectManualTime button');
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === 'pomodoroBtn') {
                resetTimer(pomodoroLength * 60);
            } else if (button.id === 'shortBreakBtn') {
                resetTimer(shortBreakLength * 60);
            } else if (button.id === 'longBreakBtn') {
                resetTimer(longBreakLength * 60);
            }
        });
    });
}

export { startTimer, pauseTimer, resetTimer, updateTimerValues };
