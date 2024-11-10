from django.shortcuts import render, redirect
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
        try:
            user = UserAccount.objects.get(email=email)
            if user.check_password(password):  # Check the hashed password
                return redirect('index')  # Redirect to a home page or dashboard
        except UserAccount.DoesNotExist:
            pass
    return render(request, 'login.html')

def index(request):
    return render(request, 'index.html')