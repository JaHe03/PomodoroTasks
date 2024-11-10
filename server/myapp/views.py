from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password
from .models import UserAccount

def signup(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        hashed_password = make_password(password)  # Hash the password
        user = UserAccount.objects.create(email=email, password=hashed_password)
        return redirect('login')
    return render(request, 'signUp.html')

def login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        try:
            user = UserAccount.objects.get(email=email)
            if user.check_password(password):  # Check the hashed password
                return redirect('home')  # Redirect to a home page or dashboard
        except UserAccount.DoesNotExist:
            pass
    return render(request, 'login.html')

def index(request):
    return render(request, 'index.html')