from django.contrib.auth import views as auth_views
from django.urls import path
from . import views
from .views import PomodoroPreferenceView

urlpatterns = [
    path('', views.index, name='index'),
    path('pomodoro-preferences/', PomodoroPreferenceView.as_view(), name='pomodoro-preferences'),
    path('get-user-preferences/', PomodoroPreferenceView.as_view(), name='get-user-preferences'),
    path('login/', views.login_view, name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('signup/', views.signup, name='signup'),
    # Add other paths like index if needed
]
