from django.db import models
from django.contrib.auth.models import User

class UserPreference(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="preferences")
    pomodoro_duration = models.IntegerField(default=25)  # in minutes
    long_duration = models.IntegerField(default=15)  # in minutes
    short_duration = models.IntegerField(default=5)  # in minutes
    theme = models.CharField(max_length=50, default="light")  # e.g., "light" or "dark"

    def __str__(self):
        return f"{self.user.username}'s Preferences"
