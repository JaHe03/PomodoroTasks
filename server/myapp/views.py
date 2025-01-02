from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth import login
from django.contrib.auth.models import User
from .forms import CustomUserCreationForm
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import PomodoroPreference
from .serializers import PomodoroPreferenceSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

def index(request):
    return render(request, 'index.html')

def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()  # Save the user, hashing the password
            login(request, user)  # Log the user in automatically after sign-up
            return redirect('index')  # Redirect to a protected page
    else:
        form = CustomUserCreationForm()
    return render(request, 'signup.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Get the user by email and check credentials
        try:
            print("email", email, "password", password)
            username = User.objects.get(email=email).username  # Lookup username by email
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('index')
        except User.DoesNotExist:
            pass

        # If credentials are invalid or user doesn't exist
        return render(request, 'login.html', {'error': 'Invalid credentials'})
    return render(request, 'login.html')


@login_required
def custom_logout(request):
    logout(request)
    return redirect('login')  # Redirect to the homepage or login page

@method_decorator(ensure_csrf_cookie, name='dispatch')
class PomodoroPreferenceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Retrieve the user's Pomodoro preferences."""
        try:
            preference = PomodoroPreference.objects.get(user=request.user)
            serializer = PomodoroPreferenceSerializer(preference)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except PomodoroPreference.DoesNotExist:
            return Response(
                {"detail": "Preferences not found. Please create them."},
                status=status.HTTP_404_NOT_FOUND
            )

    def post(self, request):
        """Save or update the user's Pomodoro preferences."""
        try:
            preference, created = PomodoroPreference.objects.get_or_create(user=request.user)

            serializer = PomodoroPreferenceSerializer(preference, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"detail": "Preferences saved successfully.", "data": serializer.data},
                    status=status.HTTP_200_OK if not created else status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"detail": "An error occurred while saving preferences.", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
