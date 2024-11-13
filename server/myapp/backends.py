# myapp/backends.py
from django.contrib.auth.backends import ModelBackend
from .models import UserAccount

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = UserAccount.objects.get(email=email)
        except UserAccount.DoesNotExist:
            return None
        if user.check_password(password):
            return user
        return None
