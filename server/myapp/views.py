from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth import login
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
        username = request.POST.get('email')  # Get the username field
        password = request.POST.get('password')  # Get the password field
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)  # Log the user in
            return redirect('index')  # Redirect to the home page
        else:
            # If the user doesn't exist or password is wrong
            return render(request, 'login.html', {'error': 'Invalid credentials'})
    return render(request, 'login.html')

def custom_logout(request):
    logout(request)
    return redirect('login')  # Redirect to the homepage or login page