from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.hashers import make_password
from .models import UserAccount

def signup(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        confirm_password = request.POST['confirmPassword']

        if password != confirm_password:
            # Handle the error, e.g., show a message to the user
            return render(request, 'signUp.html', {'error': 'Passwords do not match'})
        
        hashed_password = make_password(password)  # Hash the password
        user = UserAccount.objects.create(email=email, password=hashed_password)
        return redirect('login')
    
    return render(request, 'signUp.html')

def login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        user = authenticate(request, email=email, password=password)
        if user is not None:
            auth_login(request, user)  # Log the user in, creating a session
            print("User is logged in:", request.user.is_authenticated)
            return redirect('index')  # Redirect to index or home page
        else:
            # If authentication fails, show an error message
            return render(request, 'login.html', {'error': 'Invalid email or password'})
    
    return render(request, 'login.html')

def index(request):
    return render(request, 'index.html')

def logout(request):
    auth_logout(request)  # Log the user out
    return render(request, 'index.html')