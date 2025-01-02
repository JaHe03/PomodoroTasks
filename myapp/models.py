from django.db import models
from django.contrib.auth.models import User

class PomodoroPreference(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    pomodoro_minutes = models.PositiveIntegerField(default=25)
    pomodoro_seconds = models.PositiveIntegerField(default=0)
    short_break_minutes = models.PositiveIntegerField(default=5)
    short_break_seconds = models.PositiveIntegerField(default=0)
    long_break_minutes = models.PositiveIntegerField(default=15)
    long_break_seconds = models.PositiveIntegerField(default=0)
    long_break_interval = models.PositiveIntegerField(default=4)
    
    THEME_CHOICES = [
        ('light', 'Light'),
        ('dark', 'Dark'),
        ('default', 'Default'),
    ]
    theme = models.CharField(max_length=50, choices=THEME_CHOICES, default='default') 

    def __str__(self):
        return f"{self.user.username}'s Preferences"
    

