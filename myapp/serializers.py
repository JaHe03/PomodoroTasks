# serializers.py
from rest_framework import serializers
from .models import PomodoroPreference

class PomodoroPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PomodoroPreference
        fields = '__all__'