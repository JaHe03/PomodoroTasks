from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth import login
from django.contrib.auth.models import User
from .forms import CustomUserCreationForm

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

def custom_logout(request):
    logout(request)
    return redirect('login')  # Redirect to the homepage or login page