import { setTheme } from './themes.js';

document.addEventListener('DOMContentLoaded', () => {
    // Fetch CSRF token from meta tag
    const getCsrfToken = () => {
        const meta = document.querySelector('meta[name="csrf-token"]');
        return meta ? meta.getAttribute('content') : null;
    };

    const csrfToken = getCsrfToken();

    // Event listener for theme dropdown
    let selectedTheme = 'default';
    const themeDropdown = document.getElementById('themeDropdown');
    
    themeDropdown.addEventListener('change', (event) => {
        selectedTheme = event.target.value;
        setTheme(selectedTheme); // Apply the selected theme
    });

    // Save preferences on clicking "Save" button

    const savebtn = document.getElementById('saveBtn')
    if (savebtn) {
        savebtn.addEventListener('click', async () => {
        const pomodoroMinutes = document.getElementById('pomodoroMinutes').value || 25;
        const pomodoroSeconds = document.getElementById('pomodoroSeconds').value || 0;

        const breakMinutes = document.getElementById('breakMinutes').value || 5;
        const breakSeconds = document.getElementById('breakSeconds').value || 0;
        
        const longBreakMinutes = document.getElementById('longBreakMinutes').value || 15;
        const longBreakSeconds = document.getElementById('longBreakSeconds').value || 0;
        
        const longBreakInterval = document.getElementById('longBreakInterval').value || 4;

        try {
            const response = await fetch('/pomodoro-preferences/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({
                    pomodoro_minutes: pomodoroMinutes,
                    pomodoro_seconds: pomodoroSeconds,
                    short_break_minutes: breakMinutes,
                    short_break_seconds: breakSeconds,
                    long_break_minutes: longBreakMinutes,
                    long_break_seconds: longBreakSeconds,
                    long_break_interval: longBreakInterval,
                    theme: selectedTheme
                }),
            });

            if (response.ok) {
                alert('Preferences saved successfully!');
            } else {
                const error = await response.json().catch(() => ({}));
                alert(`Failed to save preferences: ${error.detail || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error saving preferences:', error);
            alert('An unexpected error occurred while saving preferences.');
        }
    });

    // Load user preferences on page load
    async function loadUserPreferences() {
        try {
            const response = await fetch('/get-user-preferences/');
            if (response.ok) {
                const preferences = await response.json();
                document.getElementById('pomodoroMinutes').value = preferences.pomodoro_minutes || 25;
                document.getElementById('pomodoroSeconds').value = preferences.pomodoro_seconds || 0;
                document.getElementById('breakMinutes').value = preferences.short_break_minutes || 5;
                document.getElementById('breakSeconds').value = preferences.short_break_seconds || 0;
                document.getElementById('longBreakMinutes').value = preferences.long_break_minutes || 15;
                document.getElementById('longBreakSeconds').value = preferences.long_break_seconds || 0;
                document.getElementById('longBreakInterval').value = preferences.long_break_interval || 4;

                // Set the theme in the dropdown and apply it
                themeDropdown.value = preferences.theme || 'default';
                setTheme(preferences.theme || 'default');
            } else {
                console.error('Failed to load user preferences');
            }
        } catch (error) {
            console.error('Error loading user preferences:', error);
        }
    }

    // Call the function to load preferences on page load
    loadUserPreferences();
    }
});

